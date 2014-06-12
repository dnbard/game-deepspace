'use strict';

angular.module('evolutionApp')
  .controller('MainCtrl', function ($scope, User, $http) {
    /*$http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });*/
      
      $scope.isLoggedIn = function(){
          var a = User();
          debugger;
      }
  });
