ngSoundManager.directive('shuffleAllMusic', ['angularPlayer', function (angularPlayer) {
    return {
        restrict: "EA",
        link: function (scope, element, attrs) {

            element.bind('click', function (event) {
                angularPlayer.playShuffle();
            });

            scope.shuffle = angularPlayer.getShuffleStatus();            
        }
    };
}]);