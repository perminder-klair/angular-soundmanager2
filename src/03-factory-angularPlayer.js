ngSoundManager.factory('angularPlayer', ['$rootScope', '$log',
    function($rootScope, $log) {

        var currentTrack = null,
            repeat = false,
            autoPlay = true,
            isPlaying = false,
            volume = 90,
            trackProgress = 0,
            playlist = [];

        return {
            /**
             * Initialize soundmanager,
             * requires soundmanager2 to be loaded first
             */
            init: function() {
                if(typeof soundManager === 'undefined') {
                    alert('Please include SoundManager2 Library!');
                }
                soundManager.setup({
                    //url: '/path/to/swfs/',
                    //flashVersion: 9,
                    preferFlash: false, // prefer 100% HTML5 mode, where both supported
                    debugMode: false, // enable debugging output ($log.debug() with HTML fallback)
                    useHTML5Audio: true,
                    onready: function() {
                        //$log.debug('sound manager ready!');
                    },
                    ontimeout: function() {
                        alert('SM2 failed to start. Flash missing, blocked or security error?');
                        alert('The status is ' + status.success + ', the error type is ' + status.error.type);
                    },
                    defaultOptions: {
                        // set global default volume for all sound objects
                        autoLoad: false, // enable automatic loading (otherwise .load() will call with .play())
                        autoPlay: false, // enable playing of file ASAP (much faster if "stream" is true)
                        from: null, // position to start playback within a sound (msec), see demo
                        loops: 1, // number of times to play the sound. Related: looping (API demo)
                        multiShot: false, // let sounds "restart" or "chorus" when played multiple times..
                        multiShotEvents: false, // allow events (onfinish()) to fire for each shot, if supported.
                        onid3: null, // callback function for "ID3 data is added/available"
                        onload: null, // callback function for "load finished"
                        onstop: null, // callback for "user stop"
                        onfailure: 'nextTrack', // callback function for when playing fails
                        onpause: null, // callback for "pause"
                        onplay: null, // callback for "play" start
                        onresume: null, // callback for "resume" (pause toggle)
                        position: null, // offset (milliseconds) to seek to within downloaded sound.
                        pan: 0, // "pan" settings, left-to-right, -100 to 100
                        stream: true, // allows playing before entire file has loaded (recommended)
                        to: null, // position to end playback within a sound (msec), see demo
                        type: 'audio/mp3', // MIME-like hint for canPlay() tests, eg. 'audio/mp3'
                        usePolicyFile: false, // enable crossdomain.xml request for remote domains (for ID3/waveform access)
                        volume: volume, // self-explanatory. 0-100, the latter being the max.
                        whileloading: function() {
                            //soundManager._writeDebug('sound '+this.id+' loading, '+this.bytesLoaded+' of '+this.bytesTotal);
                            var trackLoaded = ((this.bytesLoaded/this.bytesTotal)*100);
                            $rootScope.$broadcast('track:loaded', trackLoaded);
                        },
                        whileplaying: function() {
                            //soundManager._writeDebug('sound '+this.id+' playing, '+this.position+' of '+this.duration);
                            //broadcast current playing track id
                            currentTrack = this.id;
                            //$rootScope.$broadcast('track:id', this.id);
                            //broadcast current playing track progress
                            trackProgress = ((this.position / this.duration) * 100);
                            $rootScope.$broadcast('track:progress', trackProgress);
                            //broadcast track position
                            $rootScope.$broadcast('currentTrack:position', this.position);
                            //broadcast track duration
                            $rootScope.$broadcast('currentTrack:duration', this.duration);
                        },
                        onfinish: function() {
                            soundManager._writeDebug(this.id + ' finished playing');
                            if(autoPlay === true) {
                                //play next track if autoplay is on
                                //get your angular app
                                var elem = angular.element(document.querySelector('[ng-app]'));
                                //get the injector.
                                var injector = elem.injector();
                                //get the service.
                                var angularPlayer = injector.get('angularPlayer');
                                angularPlayer.nextTrack();
                                $rootScope.$broadcast('track:id', currentTrack);
                            }
                        }
                    }
                });
                soundManager.onready(function() {
                    $log.debug('song manager ready!');
                    // Ready to use; soundManager.createSound() etc. can now be called.
                    var isSupported = soundManager.ok();
                    $log.debug('is supported: ' + isSupported);
                    $rootScope.$broadcast('angularPlayer:ready', true);
                });
            },
            /**
             * To check if value is in array
             */
            isInArray: function(array, value) {
                for(var i = 0; i < array.length; i++) {
                    if(array[i].id === value) {
                        return i;
                    }
                }
                return false;
            },
            /**
             * getIndexByValue used by this factory
             */
            getIndexByValue: function(array, value) {
                for(var i = 0; i < array.length; i++) {
                    if(array[i] === value) {
                        return i;
                    }
                }
                return false;
            },
            /**
             * asyncLoop used by this factory
             */
            asyncLoop: function(o) {
                var i = -1;
                var loop = function() {
                    i++;
                    if(i == o.length) {
                        o.callback();
                        return;
                    }
                    o.functionToLoop(loop, i);
                };
                loop(); //init
            },
            setCurrentTrack: function(key) {
                currentTrack = key;
            },
            getCurrentTrack: function() {
                return currentTrack;
            },
            currentTrackData: function() {
                var trackId = this.getCurrentTrack();
                var currentKey = this.isInArray(playlist, trackId);
                return playlist[currentKey];
            },
            getPlaylist: function(key) {
                if(typeof key === 'undefined') {
                    return playlist;
                } else {
                    return playlist[key];
                }
            },
            addToPlaylist: function(track) {
                playlist.push(track);
                //broadcast playlist
                $rootScope.$broadcast('player:playlist', playlist);
            },
            isTrackValid: function (track) {
                if (typeof track == 'undefined') {
                    $log.debug('invalid track data');
                    return false;
                }

                if (track.url.indexOf("soundcloud") > -1) {
                    //if soundcloud url
                    if(typeof track.url == 'undefined') {
                        $log.debug('invalid soundcloud track url');
                        return false;
                    }
                } else {
                    if(soundManager.canPlayURL(track.url) !== true) {
                        $log.debug('invalid song url');
                        return false;
                    }
                }
            },
            addTrack: function(track) {
                //check if track itself is valid and if its url is playable
                if (!this.isTrackValid) {
                    return null;
                }

                //check if song already does not exists then add to playlist
                var inArrayKey = this.isInArray(this.getPlaylist(), track.id);
                if(inArrayKey === false) {
                    //$log.debug('song does not exists in playlist');
                    //add to sound manager
                    soundManager.createSound({
                        id: track.id,
                        url: track.url
                    });
                    soundManager.setVolume(track.id, volume);
                    //add to playlist
                    this.addToPlaylist(track);
                }
                return track.id;
            },
            removeSong: function(song, index) {
                //if this song is playing stop it
                if(song === currentTrack) {
                    this.stop();
                }
                //unload from soundManager
                soundManager.destroySound(song);
                //remove from playlist
                playlist.splice(index, 1);
                //once all done then broadcast
                $rootScope.$broadcast('player:playlist', playlist);
            },
            initPlayTrack: function(trackId, isResume) {
                if(isResume !== true) {
                    //stop and unload currently playing track
                    this.stop();
                    //set new track as current track
                    this.setCurrentTrack(trackId);
                }
                //play it
                soundManager.play(trackId);
                $rootScope.$broadcast('track:id', trackId);
                //set as playing
                isPlaying = true;
                $rootScope.$broadcast('music:isPlaying', isPlaying);
            },
            play: function() {
                var trackToPlay = null;
                //check if no track loaded, else play loaded track
                if(this.getCurrentTrack() === null) {
                    if(soundManager.soundIDs.length === 0) {
                        $log.debug('playlist is empty!');
                        return;
                    }
                    soundManager.setVolume(soundManager.soundIDs[0], volume);
                    trackToPlay = soundManager.soundIDs[0];
                    this.initPlayTrack(trackToPlay);
                } else {
                    trackToPlay = this.getCurrentTrack();
                    this.initPlayTrack(trackToPlay, true);
                }
            },
            pause: function() {
                soundManager.pause(this.getCurrentTrack());
                //set as not playing
                isPlaying = false;
                $rootScope.$broadcast('music:isPlaying', isPlaying);
            },
            stop: function() {
                //first pause it
                this.pause();
                this.resetProgress();
                $rootScope.$broadcast('track:progress', trackProgress);
                $rootScope.$broadcast('currentTrack:position', 0);
                $rootScope.$broadcast('currentTrack:duration', 0);
                soundManager.stopAll();
                soundManager.unload(this.getCurrentTrack());
            },
            playTrack: function(trackId) {
                this.initPlayTrack(trackId);
            },
            nextTrack: function() {
                if(this.getCurrentTrack() === null) {
                    $log.debug("Please click on Play before this action");
                    return null;
                }
                var currentTrackKey = this.getIndexByValue(soundManager.soundIDs, this.getCurrentTrack());
                var nextTrackKey = +currentTrackKey + 1;
                var nextTrack = soundManager.soundIDs[nextTrackKey];
                if(typeof nextTrack !== 'undefined') {
                    this.playTrack(nextTrack);
                } else {
                    //if no next track found
                    if(repeat === true) {
                        //start first track if repeat is on
                        this.playTrack(soundManager.soundIDs[0]);
                    } else {
                        //breadcase not playing anything
                        isPlaying = false;
                        $rootScope.$broadcast('music:isPlaying', isPlaying);
                    }
                }
            },
            prevTrack: function() {
                if(this.getCurrentTrack() === null) {
                    $log.debug("Please click on Play before this action");
                    return null;
                }
                var currentTrackKey = this.getIndexByValue(soundManager.soundIDs, this.getCurrentTrack());
                var prevTrackKey = +currentTrackKey - 1;
                var prevTrack = soundManager.soundIDs[prevTrackKey];
                if(typeof prevTrack !== 'undefined') {
                    this.playTrack(prevTrack);
                } else {
                    $log.debug('no prev track found!');
                }
            },
            mute: function() {
                if(soundManager.muted === true) {
                    soundManager.unmute();
                } else {
                    soundManager.mute();
                }
                $rootScope.$broadcast('music:mute', soundManager.muted);
            },
            getMuteStatus: function() {
                return soundManager.muted;
            },
            repeatToggle: function() {
                if(repeat === true) {
                    repeat = false;
                } else {
                    repeat = true;
                }
                $rootScope.$broadcast('music:repeat', repeat);
            },
            getRepeatStatus: function() {
                return repeat;
            },
            getVolume: function() {
                return volume;
            },
            adjustVolume: function(increase) {
                var changeVolume = function(volume) {
                    for(var i = 0; i < soundManager.soundIDs.length; i++) {
                        var mySound = soundManager.getSoundById(soundManager.soundIDs[i]);
                        mySound.setVolume(volume);
                    }
                    $rootScope.$broadcast('music:volume', volume);
                };
                if(increase === true) {
                    if(volume < 100) {
                        volume = volume + 10;
                        changeVolume(volume);
                    }
                } else {
                    if(volume > 0) {
                        volume = volume - 10;
                        changeVolume(volume);
                    }
                }
            },
            adjustVolumeSlider: function(value) {
                var changeVolume = function(volume) {
                    for(var i = 0; i < soundManager.soundIDs.length; i++) {
                        var mySound = soundManager.getSoundById(soundManager.soundIDs[i]);
                        mySound.setVolume(volume);
                    }
                    $rootScope.$broadcast('music:volume', volume);
                };
                changeVolume(value);
            },
            clearPlaylist: function(callback) {
                $log.debug('clear playlist');
                this.resetProgress();
                //unload and destroy soundmanager sounds
                var smIdsLength = soundManager.soundIDs.length;
                this.asyncLoop({
                    length: smIdsLength,
                    functionToLoop: function(loop, i) {
                        setTimeout(function() {
                            //custom code
                            soundManager.destroySound(soundManager.soundIDs[0]);
                            //custom code
                            loop();
                        }, 100);
                    },
                    callback: function() {
                        //callback custom code
                        $log.debug('All done!');
                        //clear playlist
                        playlist = [];
                        $rootScope.$broadcast('player:playlist', playlist);
                        callback(true);
                        //callback custom code
                    }
                });
            },
            resetProgress: function() {
                trackProgress = 0;
            },
            isPlayingStatus: function() {
                return isPlaying;
            }
        };
    }
]);
