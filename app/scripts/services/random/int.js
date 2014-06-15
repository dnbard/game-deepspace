'use strict';

angular.module('evolutionApp')
    .factory('IntRandom', function () {
        function get(){
            if (arguments.length === 0){
                return;
            } else if (arguments.length === 2){
                return getRandomInt.apply(this, arguments);
            }
        }

        function getRandomInt(min, max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return { get: get }
    });
