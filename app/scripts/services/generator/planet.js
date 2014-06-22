'use strict';

angular.module('evolutionApp')
    .factory('PlanetGenerator', function ($q, ImageUtility) {
        function createLayer(layer){
            var canvas, ctx, img = layer.image;

            if (img === undefined){
                throw new Error('Image should be provided to layer');
            }

            if (layer.overlay){
                canvas = document.createElement("canvas");
                ctx = canvas.getContext("2d");

                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0);

                ctx.globalCompositeOperation = 'source-in';

                ctx.rect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = layer.overlay;
                ctx.fill();

                ctx.restore();
            }
            return canvas? canvas : img;
        }

        function generate(){
            var defer = $q.defer(),
                config = [{
                        image: 'images/shapes/planet-base0.png'
                    }, {
                        image: 'images/shapes/planet0.png',
                        overlay: 'blue'
                    }, {
                        image: 'images/shapes/planet-shadow0.png'
                    }],
                loadScript = [];

            _.each(config, function(cfg){
                if (typeof cfg.image !== 'string'){
                    throw new Error('Image must be specified');
                }

                loadScript.push(ImageUtility.load(cfg.image));
            });

            if (loadScript.length === 0){
                defer.reject();
                return defer;
            }

            $q.all(loadScript)
                .then(function(images){
                if (images.length === 0){
                    defer.reject();
                }

                var layers = [], data, index = 0;

                _.each(images, function(image){
                    var layer = createLayer({
                        image: image,
                        overlay: config[index].overlay
                    });

                    index++;
                    layers.push(layer);
                });

                var canvas = document.createElement("canvas"),
                    ctx = canvas.getContext("2d");

                canvas.width = layers[0].width;
                canvas.height = layers[0].height;

                _.each(layers, function(layer){
                    ctx.drawImage(layer, 0, 0);
                });

                data = ImageUtility.toDataUrl(canvas);
                defer.resolve(data);
            });
            return defer.promise;
        }

        return {
            generate: generate
        };
    });
