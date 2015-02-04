ngSoundManager.directive('removeFromPlaylist', ['angularPlayer',
    function(angularPlayer) {
        return {
            restrict: "EA",
            scope: {
                song: "=removeFromPlaylist"
            },
            link: function(scope, element, attrs) {
                element.bind('click', function(event) {
                    angularPlayer.removeSong(scope.song.id, attrs.index);
                });
            }
        };
    }
]);