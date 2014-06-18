'use strict';

angular.module('evolutionApp')
    .factory('Starship', function (StringRandom) {
        function Starship (){
            this.name = StringRandom.starship();
        }

        return Starship;
  });
