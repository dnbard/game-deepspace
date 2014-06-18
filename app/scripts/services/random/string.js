'use strict';

angular.module('evolutionApp')
    .factory('StringRandom', function (IntRandom) {
        var solars = {
            first: ['alpha', 'beta', 'gamma', 'delta', 'cappa', 'omega', 'tau'],
            second: ['centauri', 'draconis', 'orionis', 'hydrae', 'ceti', 'herculis', 'pegasi', 'persei', 'eri', 'lyrae', 'velorum', 'serpentis', 'lyr', 'canis'],
            third: ['minoris', 'majoris']
        };

        var ships = {
            first: ['Churchill', 'Daedalus', 'Explorer', 'Moonraker', 'Ranger', 'Shuttlecraft', 'Aries', 'Eagle', 'Friede', 'Hawk', 'Matflower', 'Anastasia', 'Axiom', 'Bilkis', 'Mongoose', 'Icarus', 'Lauryad', 'Lewis', 'Clark', 'Orbit', 'Ryvius', 'Hammerhead', 'Scorpio', 'Discovery', 'Unity', 'Cygnus', 'Valley', 'Amaterasu', 'Argonaut', 'Ark', 'Bellerophon', 'Derelict', 'Agamemnon', 'Hyperion', 'Excalibur', 'Liberator', 'Minbari', 'Nemesis', 'Nirvana', 'Protector', 'Orion', 'Prometheus', 'Macross', 'Pioneer', 'Normandy', 'Aurora'],
            second: ['SSTO-TAV-<%- randomlittle %>B', 'X-<%- random %>', 'UN', 'USS', 'F-<%- random %>', 'SA-<%- randomlittle %>', 'NSEA'],
            third: ['<%- random %>', 'Mk. <%- randomlittle %>', 'XD-<%- randomlittle %>', 'X', 'V']
        }

        function getShip(){
            var rnd = IntRandom.get(0, 99), result;

            if(rnd < 10){
                result = generateOneWordName(ships.first, false);
            } else if (rnd < 85) {
                result = generateTwoWordsName(ships.second, ships.first, false);
            } else {
                result = generateTwoWordsName(ships.first, ships.third, false);
            }

            result = _.template(result, {
                randomlittle: IntRandom.get(1, 9),
                random: IntRandom.get(1, 99)
            });

            return result;
        }

        function getSolar(){
            var rnd = IntRandom.get(0, 99);
            if (rnd < 85){
                return generateTwoWordsName(solars.first, solars.second);
            } else {
                return generateThreeWordsName(solars.first, solars.second, solars.third);
            }
        }

        function generateOneWordName(first, capitalize){
            capitalize = capitalize === undefined? true : !!capitalize;
            var result = (first[IntRandom.get(0, first.length - 1)]);
            if (capitalize){
                result = result.capitalize(true);
            }
            return result;
        }

        function generateTwoWordsName(first, second, capitalize){
            capitalize = capitalize === undefined? true : !!capitalize;
            var result =  (first[IntRandom.get(0, first.length - 1)] + ' ' +
                second[IntRandom.get(0, second.length - 1)]);
            if (capitalize){
                result = result.capitalize(true);
            }
            return result;
        }

        function generateThreeWordsName(first, second, third, capitalize){
            capitalize = capitalize === undefined? true : !!capitalize;
            var result = (first[IntRandom.get(0, first.length - 1)] + ' ' +
                second[IntRandom.get(0, second.length - 1)] + ' ' +
                   third[IntRandom.get(0, third.length - 1)]);
            if (capitalize){
                result = result.capitalize(true);
            }
            return result;
        }

        return {
            solar: getSolar,
            starship: getShip
        };
    });
