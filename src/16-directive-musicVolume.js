ngSoundManager.directive('musicVolume', ['angularPlayer',
    function(angularPlayer) {
        return {
            restrict: "EA",
            link: function(scope, element, attrs) {
                element.bind('click', function(event) {
                    if(attrs.type === 'increase') {
                        angularPlayer.adjustVolume(true);
                    } else {
                        angularPlayer.adjustVolume(false);
                    }
                });
                scope.volume = angularPlayer.getVolume();
                scope.$on('music:volume', function(event, data) {
                    scope.$apply(function() {
                        scope.volume = data;
                    });
                });
            }
        };
    }
]);