'use strict';

angular.module('evolutionApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
