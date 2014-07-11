angular.module('angularSoundManager')
    .directive('soundManager', function ($filter, player) {
        return {
            restrict: "E",
            link: function (scope, element, attrs) {

                //init and load sound manager 2
                player.init();

                scope.$on('track:progress', function (event, data) {
                    scope.$apply(function () {
                        scope.progress = data;
                    });
                });

                scope.$on('track:id', function (event, data) {
                    scope.$apply(function () {
                        scope.currentPlaying = player.currentTrackData();
                    });
                });

                scope.$on('currentTrack:position', function (event, data) {
                    scope.$apply(function () {
                        scope.currentPostion = $filter('humanTime')(data);
                    });
                });

                scope.$on('currentTrack:duration', function (event, data) {
                    scope.$apply(function () {
                        scope.currentDuration = $filter('humanTime')(data);
                    });
                });

            }
        };
    })
    .directive('musicPlayer', function (player) {
        return {
            restrict: "EA",
            scope: {
                songs: "=allSongs",
                playlist: "=myPlaylist"
            },
            link: function (scope, element, attrs) {

                var trackId = null;

                var addToPlaylist = function () {
                    trackId = player.addSong(scope.songs[attrs.song]);

                    scope.$apply(function () {
                        scope.playlist = player.getPlaylist();
                    });
                };

                element.bind('click', function () {

                    if (attrs.type === 'addToPlaylist') {
                        console.log('adding song to playlist');

                        addToPlaylist();

                    } else if (attrs.type === 'playTrack') {
                        console.log('play track');

                        addToPlaylist();

                        player.playTrack(trackId);
                    }

                });
            }
        };
    })
    .directive('playFromPlaylist', function (player) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    console.log(attrs.song);
                    player.playTrack(attrs.song);
                });

            }
        };
    })
    .directive('removeFromPlaylist', function (player) {
        return {
            restrict: "EA",
            scope: {
                playlist: "=myPlaylist"
            },
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    player.removeSong(attrs.song, attrs.index);
                    //refresh playlist
                    scope.$apply(function () {
                        scope.playlist = player.getPlaylist();
                    });
                });

            }
        };
    })
    .directive('seekTrack', function (player) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    if (player.getCurrentTrack() === null) {
                        console.log('no track loaded');
                        return;
                    }

                    var sound = soundManager.getSoundById(player.getCurrentTrack());

                    var x = event.x - element[0].offsetLeft,
                        width = element[0].clientWidth,
                        duration = sound.durationEstimate;

                    sound.setPosition((x / width) * duration);
                });

            }
        };
    })
    .directive('playMusic', function (player) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    player.play();
                });

            }
        };
    })
    .directive('pauseMusic', function (player) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    player.pause();
                });

            }
        };
    })
    .directive('stopMusic', function (player) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    player.stop();
                });

            }
        };
    })
    .directive('nextTrack', function (player) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    player.nextTrack();
                });

            }
        };
    })
    .directive('prevTrack', function (player) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    player.prevTrack();
                });

            }
        };
    })
    .directive('muteMusic', function (player) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    player.mute();
                });

                scope.mute = player.getMuteStatus();
                scope.$on('music:mute', function (event, data) {
                    scope.$apply(function () {
                        scope.mute = data;
                    });
                });

            }
        };
    })
    .directive('repeatMusic', function (player) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    player.repeatToggle();
                });

                scope.repeat = player.getRepeatStatus();
                scope.$on('music:repeat', function (event, data) {
                    scope.$apply(function () {
                        scope.repeat = data;
                    });
                });
            }
        };
    })
    .directive('musicVolume', function (player) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    if (attrs.type === 'increase') {
                        player.adjustVolume(true);
                    } else {
                        player.adjustVolume(false);
                    }
                });

                scope.volume = player.getVolume();
                scope.$on('music:volume', function (event, data) {
                    scope.$apply(function () {
                        scope.volume = data;
                    });
                });

            }
        };
    })
    .directive('setPlaylist', function (player) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                scope.playlist = player.getPlaylist();
                scope.$on('music:playlist', function (event, data) {
                    scope.$apply(function () {
                        scope.playlist = player.getPlaylist();
                    });
                });

            }
        };
    })
    .directive('clearPlaylist', function (player) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    console.log(soundManager.soundIDs);
                    player.clearPlaylist(function (data) {
                        console.log(soundManager.soundIDs);
                    });
                });

            }
        };
    })
    .directive('playAll', function (player) {
        return {
            restrict: "EA",
            scope: {
                songs: '=playAll',
                playlist: "=myPlaylist"
            },
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {

                    //first clear the playlist
                    player.clearPlaylist(function (data) {
                        console.log('cleared, ok now add to playlist');
                        //add songs to playlist
                        for (var i = 0; i < scope.songs.length; i++) {

                            player.addSong(scope.songs[i]);
                        }


                        scope.$apply(function () {
                            scope.playlist = player.getPlaylist();
                        });

                        //play first song
                        player.play();
                    });

                });

            }
        };
    });
