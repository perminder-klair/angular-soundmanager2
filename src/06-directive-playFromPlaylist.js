ngSoundManager.directive('playFromPlaylist', ['angularPlayer', function (angularPlayer) {
        return {
            restrict: "EA",
            scope: {
                song: "=playFromPlaylist"
            },
            link: function (scope, element, attrs) {
                element.bind('click', function (event) {
                    angularPlayer.playTrack(scope.song.id);
                });
            }
        };
    }]);