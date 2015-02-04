ngSoundManager.directive('pauseMusic', ['angularPlayer', function (angularPlayer) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {
                element.bind('click', function (event) {
                    angularPlayer.pause();
                });
            }
        };
    }]);