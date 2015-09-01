ngSoundManager.directive('autoPlay', ['angularPlayer', '$log',
    function(angularPlayer, $log) {
        return {
            restrict: "EA",
            link: function(scope, element, attrs) {
                scope.$on('angularPlayer:ready', function(event, data) {
                    if (!scope.songs) {
                        $log.debug('songs is empty!');
                        return;
                    }

                    for(var i = 0; i < scope.songs.length; i++) {
                        angularPlayer.addTrack(scope.songs[i]);
                    }
                    angularPlayer.play();
                });
            }
        };
    }
]);
