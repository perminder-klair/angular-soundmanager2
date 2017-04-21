ngSoundManager.directive('repeatTrack', ['angularPlayer', function (angularPlayer) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    angularPlayer.repeatTrackToggle();
                });

                scope.repeatTrack = angularPlayer.getRepeatTrackStatus();
                scope.$on('music:repeatTrack', function (event, data) {
                    scope.$apply(function () {
                        scope.repeatTrack = data;
                    });
                });
            }
        };
    }]);