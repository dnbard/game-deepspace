'use strict';

angular.module('evolutionApp')
    .factory('DB', function ($q) {
        if (!window.localforage){
            throw new Error('Instance of Local Forage isn\'t available');
        }

        var localforage = window.localforage;

        function DB(){
            this.get = function(id){
                var defer = $q.defer();
                if (typeof id !== 'string'){
                    defer.reject();
                    throw new Error('Id argument of DB.get should be a string');
                }

                localforage.getItem(id, function(data){
                    if (!data || data === null){
                        defer.reject();
                    } else {
                        defer.resolve(data);
                    }
                });

                return defer.promise;
            }

            this.store = function(id, value){
                var defer = $q.defer();
                if (typeof id !== 'string'){
                    defer.reject();
                    throw new Error('Id argument of DB.store should be a string');
                }

                if (!value){
                    defer.reject();
                    throw new Error('Value argument of DB.store should be defined');
                }

                localforage.setItem(id, value, function(){
                    defer.resolve();
                });

                return defer.promise;
            }
        }

        return DB;
    });
