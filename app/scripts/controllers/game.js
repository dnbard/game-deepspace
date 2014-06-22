'use strict';

var pages = {
    START: 'start'
}

angular.module('evolutionApp')
    .controller('GameCtrl', function($scope, Expedition, PlanetGenerator){
        $scope.page = pages.START;

        $scope.expedition = Expedition.getInstance();
        $scope.starship = $scope.expedition.starship;

        $scope.testImage = null;

        PlanetGenerator.generate().then(function(sun){
            $scope.testImage = sun;
        });
    });
