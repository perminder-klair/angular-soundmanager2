ngSoundManager.directive('clearPlaylist', ['angularPlayer', '$log',
    function(angularPlayer, $log) {
        return {
            restrict: "EA",
            link: function(scope, element, attrs) {
                element.bind('click', function(event) {
                    //first stop any playing music
                    angularPlayer.stop();
                    angularPlayer.setCurrentTrack(null);
                    angularPlayer.clearPlaylist(function(data) {
                      $log.debug('all clear!');
                    });
                });
            }
        };
    }
]);
