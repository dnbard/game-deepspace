'use strict';

angular.module('evolutionApp')
    .factory('ImageCache', function ($q, $http) {
        var instance = null;

        function ImagesCache(instanceName){
            instanceName = instanceName || 'default/';

            function queryDb(id){
                return null;
            }

            function saveImageToDb(url, image){

            }

            function loadImageFromWeb(url, defer){
                var self = this;
                $('<img src="'+ url +'">').load(function() {
                    var img = this,
                        imgCanvas = document.createElement("canvas"),
                        imgContext = imgCanvas.getContext("2d");
                    imgCanvas.width = img.width;
                    imgCanvas.height = img.height;
                    imgContext.drawImage(img, 0, 0);

                    // Get canvas contents as a data URL
                    var imgAsDataURL = imgCanvas.toDataURL("image/png");
                    defer.resolve(imgAsDataURL);
                    saveImageToDb(url, imgAsDataURL);
                });
            }

            this.get = function(id){
                var defer = $q.defer();

                if (typeof id !== 'string'){
                    throw new Error('Id argument of ImagesCache.get must a string');
                }

                var fromDb = queryDb(instanceName + id);
                if (fromDb){
                    defer.resolve(fromDb);
                } else {
                    loadImageFromWeb(id, defer);
                }

                return defer.promise;
            }
        }

        return ImagesCache;
    });
