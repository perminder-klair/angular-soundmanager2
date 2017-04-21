ngSoundManager.directive('nextTrack', ['angularPlayer', function (angularPlayer) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                	if( angularPlayer.isLastTrack() && angularPlayer.isPlayingStatus() ){
                        return false;
                    }
                    angularPlayer.nextTrack();
                });

            }
        };
    }]);