var myApp = angular.module('angularSoundManager', []);

myApp.filter('humanTime', function () {
    return function (input) {
        function pad(d) {
            return (d < 10) ? '0' + d.toString() : d.toString();
        }

        var min = (input / 1000 / 60) << 0,
            sec = Math.round((input / 1000) % 60);

        return pad(min) + ':' + pad(sec);
    };
});