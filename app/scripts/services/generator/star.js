'use strict';

angular.module('evolutionApp')
    .factory('SolarGenerator', function (ImageCache) {
        function generate(solar){
            return new ImageCache().get('images/assets/sun.png');
        }

        return {
            generate: generate
        }
    });
