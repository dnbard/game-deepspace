'use strict';

angular.module('evolutionApp')
    .factory('ImageCache', function ($q, $http, DB) {
        var database = new DB();

        function ImagesCache(instanceName){
            instanceName = instanceName || 'default/';

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

                return database.get(instanceName + id)
                    .then(function(data){
                        defer.resolve(data);
                    }, function(){
                        loadImageFromWeb(id, defer);
                    });

                return defer.promise;
            }
        }

        return ImagesCache;
    });
