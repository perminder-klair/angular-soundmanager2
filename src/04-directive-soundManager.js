ngSoundManager.directive('soundManager', ['$filter', '$timeout', 'angularPlayer',
    function($filter, $timeout, angularPlayer) {
        return {
            restrict: "E",
            link: function(scope, element, attrs) {
                //init and load sound manager 2
                angularPlayer.init();
                scope.$on('track:progress', function(event, data) {
                    $timeout(function() {
                        scope.progress = data;
                    });
                });
                scope.$on('track:id', function(event, data) {
                    $timeout(function() {
                        scope.currentPlaying = angularPlayer.currentTrackData();
                    });
                });
                scope.$on('currentTrack:position', function(event, data) {
                    $timeout(function() {
                        scope.currentPostion = $filter('humanTime')(data);
                    });
                });
                scope.$on('currentTrack:duration', function(event, data) {
                    $timeout(function() {
                        scope.currentDuration = $filter('humanTime')(data);
                    });
                });
                scope.isPlaying = false;
                scope.$on('music:isPlaying', function(event, data) {
                    $timeout(function() {
                        scope.isPlaying = data;
                    });
                });
                scope.playlist = angularPlayer.getPlaylist(); //on load
                scope.$on('player:playlist', function(event, data) {
                    $timeout(function() {
                        scope.playlist = data;
                    });
                });
            }
        };
    }
]);
