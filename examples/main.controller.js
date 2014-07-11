angular.module('angularSoundManager')
    .controller('MainCtrl', ['$scope', 'player', function ($scope) {
        $scope.songs = [
            {
                id: 'one',
                title: 'Leh',
                url: 'http://cdn11.imp3songs.com/files/superwoman/leh-feat-humble-the-poet/128/01-leh-feat-humble-the-poet.mp3'
            },
            {
                id: 'two',
                title: 'Delete',
                url: 'http://cdn11.imp3songs.com/files/gagan-kokri/delete/128/01-delete.mp3'
            },
            {
                id: 'three',
                title: 'Police (Feat. Deep Jandu)',
                url: 'http://cdn11.imp3songs.com/files/blizzy/police-feat-deep-jandu/128/01-police-feat-deep-jandu.mp3'
            },
            {
                id: 'four',
                title: 'Life Of Villager',
                url: 'http://cdn11.imp3songs.com/files/aman-dhillon/life-of-villager-duniyadari/128/01-life-of-villager-duniyadari.mp3'
            },
            {
                id: 'five',
                title: 'Dil Cherdi',
                url: 'http://cdn11.imp3songs.com/files/jay-status/dil-cherdi/128/01-dil-cherdi.mp3'
            }
        ];

    }]);