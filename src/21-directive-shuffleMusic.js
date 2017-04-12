ngSoundManager.directive('shuffleMusic', ['angularPlayer', function (angularPlayer) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    angularPlayer.shuffleToggle();
                });

                scope.shuffle = angularPlayer.getShuffleStatus();
                scope.$on('music:shuffle', function (event, data) {
                    scope.$apply(function () {
                        scope.shuffle = data;
                    });
                    
                    if(!angularPlayer.isPlayingStatus() && scope.shuffle) {
                        angularPlayer.play();
                    }
                });
            }
        };
    }]);