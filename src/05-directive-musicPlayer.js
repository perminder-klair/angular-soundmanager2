ngSoundManager.directive('musicPlayer', ['angularPlayer',
    function(angularPlayer) {
        return {
            restrict: "EA",
            scope: {
                song: "=addSong"
            },
            link: function(scope, element, attrs) {
                var addToPlaylist = function() {
                    var trackId = angularPlayer.addTrack(scope.song);
                    //if request to play the track
                    if(attrs.musicPlayer === 'play') {
                        angularPlayer.playTrack(trackId);
                    }
                };
                element.bind('click', function() {
                    console.log('adding song to playlist');
                    addToPlaylist();
                });
            }
        };
    }
]);