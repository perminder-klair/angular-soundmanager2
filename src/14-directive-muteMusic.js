ngSoundManager.directive('muteMusic', ['angularPlayer', function (angularPlayer) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    angularPlayer.mute();
                });

                scope.mute = angularPlayer.getMuteStatus();
                scope.$on('music:mute', function (event, data) {
                    scope.$apply(function () {
                        scope.mute = data;
                    });
                });

            }
        };
    }]);