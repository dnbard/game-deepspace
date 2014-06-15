'use strict';

var pages = {
    START: 'start'
}

angular.module('evolutionApp')
    .controller('GameCtrl', function($scope, Expedition){
        $scope.page = pages.START;

        $scope.expedition = Expedition.getInstance();
        $scope.starship = $scope.expedition.starship;
    });
