'use strict';

angular.module('evolutionApp')
    .factory('IntRandom', function () {
        function get(){
            if (arguments.length === 0){
                return getRandomInt.apply(this, [0, 99]);
            } else if (arguments.length === 1){
                return getRandomInt.apply(this, [0, arguments[0]]);
            } else if (arguments.length === 2){
                return getRandomInt.apply(this, arguments);
            } else {
                throw new Error('Wrong arguments for IntRandom.get() function');
            }
        }

        function getRandomInt(min, max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return { get: get }
    });
