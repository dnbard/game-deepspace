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
            second: ['SSTO-TAV-<%- randomLittle %>B', 'X-<%- random %>', 'UN', 'USS', 'F-<%- random %>', 'SA-<%- randomLittle %>', 'NSEA'],
            third: ['<%- random %>', 'Mk. <%- randomLittle %>', 'XD-<%- randomLittle %>', 'X', 'V']
        }

        function getShip(){
            var rnd = IntRandom.get(0, 99), result;

            if(rnd < 70){
                result = generateOneWordName(ships.first);
            } else if (rnd < 85) {
                result = generateTwoWordsName(ships.second, ships.first);
            } else {
                result = generateTwoWordsName(ships.first, ships.third);
            }

            result = _.template(result, {
                Randomlittle: IntRandom.get(0, 9),
                Random: IntRandom.get(0, 99)
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

        function generateOneWordName(first){
            return (first[IntRandom.get(0, first.length - 1)]).capitalize(true);;
        }

        function generateTwoWordsName(first, second){
            return (first[IntRandom.get(0, first.length - 1)] + ' ' +
                second[IntRandom.get(0, second.length - 1)])
                .capitalize(true);
        }

        function generateThreeWordsName(first, second, third){
            return (first[IntRandom.get(0, first.length - 1)] + ' ' +
                second[IntRandom.get(0, second.length - 1)] + ' ' +
                   third[IntRandom.get(0, third.length - 1)])
                .capitalize(true);
        }

        return {
            solar: getSolar,
            starship: getShip
        };
    });
