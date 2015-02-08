var ngSoundManager = angular.module('angularSoundManager', [])
  .config(['$logProvider', function($logProvider){
    $logProvider.debugEnabled(false);
  }]);
