ngSoundManager.directive('playAll', ['angularPlayer',
    function(angularPlayer) {
        return {
            restrict: "EA",
            scope: {
                songs: '=playAll'
            },
            link: function(scope, element, attrs) {
                element.bind('click', function(event) {
                    //first clear the playlist
                    angularPlayer.clearPlaylist(function(data) {
                        console.log('cleared, ok now add to playlist');
                        //add songs to playlist
                        for(var i = 0; i < scope.songs.length; i++) {
                            angularPlayer.addTrack(scope.songs[i]);
                        }
                        //play first song
                        angularPlayer.play();
                    });
                });
            }
        };
    }
]);