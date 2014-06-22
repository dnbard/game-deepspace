'use strict';

angular.module('evolutionApp')
    .factory('ImageUtility', function ($q) {
        var instance = null;

        function getInstance(){
            if (instance === null){
                instance = new ImageUtility();
            }
            return instance;
        }

        function ImageUtility(){ }

        ImageUtility.prototype.load = function(url){
            if (typeof url !== 'string'){
                throw new Error('Argument url in ImageUtility.load() must be a string');
            }

            var defer = $q.defer();

            $('<img src="'+ url +'">').load(function() {
                var img = this;
                defer.resolve(img);
            });

            return defer.promise;
        }

        ImageUtility.prototype.toDataUrl = function(canvas){
            return canvas.toDataURL("image/png");
        }

        return getInstance();
    });
