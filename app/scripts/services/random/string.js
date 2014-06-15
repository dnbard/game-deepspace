'use strict';

angular.module('evolutionApp')
    .factory('StringRandom', function (IntRandom) {
        var solars = {
            first: ['alpha', 'beta', 'gamma', 'delta', 'cappa', 'omega', 'tau'],
            second: ['centauri', 'draconis', 'orionis', 'hydrae', 'ceti', 'herculis', 'pegasi', 'persei', 'eri', 'lyrae', 'velorum', 'serpentis', 'lyr', 'canis'],
            third: ['minoris', 'majoris']
        }

        function getSolar(){
            var rnd = IntRandom.get(0, 99);
            if (rnd < 80){
                return generateTwoNamedStar();
            } else {
                return generateThreeNamedStar();
            }
        }

        function generateTwoNamedStar(){
            return (solars.first[IntRandom.get(0, solars.first.length - 1)] + ' ' +
                solars.second[IntRandom.get(0, solars.second.length - 1)])
                .capitalize(true);
        }

        function generateThreeNamedStar(){
            return (solars.first[IntRandom.get(0, solars.first.length - 1)] + ' ' +
                solars.second[IntRandom.get(0, solars.second.length - 1)] + ' ' +
                   solars.third[IntRandom.get(0, solars.third.length - 1)])
                .capitalize(true);
        }

        return {
            solar: getSolar
        };
    });
