ngSoundManager.directive('clearPlaylist', ['angularPlayer',
    function(angularPlayer) {
        return {
            restrict: "EA",
            link: function(scope, element, attrs) {
                element.bind('click', function(event) {
                    //first stop any playing music 
                    angularPlayer.stop();
                    angularPlayer.setCurrentTrack(null);
                    angularPlayer.clearPlaylist(function(data) {
                        console.log('all clear!');
                    });
                });
            }
        };
    }
]);