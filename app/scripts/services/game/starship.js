'use strict';

angular.module('evolutionApp')
    .factory('Starship', function () {
        function Starship (){
            this.name = 'UN Unity';
        }

        return Starship;
  });
