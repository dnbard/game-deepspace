'use strict';

angular.module('evolutionApp')
    .factory('SolarRandom', function (IntRandom) {
        var dicts = {
            first: ['alpha', 'beta', 'gamma', 'delta', 'cappa', 'omega', 'tau'],
            second: ['centauri', 'draconis', 'orionis', 'hydrae', 'ceti', 'herculis', 'pegasi', 'persei', 'eri', 'lyrae', 'velorum', 'serpentis', 'lyr', 'canis'],
            third: ['minoris', 'majoris']
        }

        function get(){
            var rnd = IntRandom.get(0, 99);
            if (rnd < 100){
                return generateTwoNamedStar();
            }
        }

        function generateTwoNamedStar(){
            return dicts.first[IntRandom.get(0, dicts.first.length - 1)] + ' ' +
                dicts.second[IntRandom.get(0, dicts.second.length - 1)];
        }

        return {get: get};
    });
