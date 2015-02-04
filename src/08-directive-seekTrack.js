ngSoundManager.directive('seekTrack', ['angularPlayer', function (angularPlayer) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    if (angularPlayer.getCurrentTrack() === null) {
                        console.log('no track loaded');
                        return;
                    }

                    var sound = soundManager.getSoundById(angularPlayer.getCurrentTrack());

                    var getXOffset = function (event) {
                      var x = 0, element = event.target;
                      while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
                        x += element.offsetLeft - element.scrollLeft;
                        element = element.offsetParent;
                      }
                      return event.clientX - x;
                    };

                    var x = event.offsetX || getXOffset(event),
                        width = element[0].clientWidth,
                        duration = sound.durationEstimate;

                    sound.setPosition((x / width) * duration);
                });

            }
        };
    }]);