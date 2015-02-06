ngSoundManager.directive('playPauseToggle', ['angularPlayer',
    function(angularPlayer) {
        return {
            restrict: "EA",
            link: function(scope, element, attrs) {
                scope.$on('music:isPlaying', function(event, data) {
                    //update html
                    if (data) {
                        if(typeof attrs.pause != 'undefined') {
                            element.html(attrs.pause);
                        } else {
                            element.html('Pause');
                        }
                    } else {
                        if(typeof attrs.play != 'undefined') {
                            element.html(attrs.play);
                        } else {
                            element.html('Play');
                        }
                    }
                });
                
                element.bind('click', function(event) {
                    if(angularPlayer.isPlayingStatus()) {
                        //if playing then pause
                        angularPlayer.pause();
                    } else {
                        //else play if not playing
                        angularPlayer.play();
                        
                    }
                });
            }
        };
    }
]);
