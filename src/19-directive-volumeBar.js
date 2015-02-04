ngSoundManager.directive('volumeBar', ['angularPlayer',
    function(angularPlayer) {
        return {
            restrict: "EA",
            link: function(scope, element, attrs) {
                element.bind('click', function(event) {
                    var getXOffset = function(event) {
                        var x = 0,
                            element = event.target;
                        while(element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
                            x += element.offsetLeft - element.scrollLeft;
                            element = element.offsetParent;
                        }
                        return event.clientX - x;
                    };
                    var x = event.offsetX || getXOffset(event),
                        width = element[0].clientWidth,
                        duration = 100;
                    var volume = (x / width) * duration;
                    angularPlayer.adjustVolumeSlider(volume);
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