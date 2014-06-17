'use strict';

angular.module('evolutionApp')
    .factory('Environment', function () {
        return {
            development: !!window.isDev,
            stage: !!window.isDev? 'development': 'production'
        };
    });
