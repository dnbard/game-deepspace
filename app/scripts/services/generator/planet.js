'use strict';

angular.module('evolutionApp')
    .factory('PlanetGenerator', function ($q, ImageUtility, IntRandom) {
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

        function createPlanetConfig(){
            var config = [];

            config.push({
                image: 'images/shapes/planet-base.png',
                overlay: 'darkgreen'
            });

            for(var i = 0; i < IntRandom.get(1, 4); i ++){
                config.push({
                    image: _.template('images/shapes/planet${water}.png', {
                        water: IntRandom.get(0, 64)
                    }),
                    overlay: 'blue'
                });
            }

            for(var i = 0; i < IntRandom.get(1, 2); i ++){
                config.push({
                    image: _.template('images/shapes/planet${cloud}.png', {
                        cloud: IntRandom.get(0, 64)
                    }),
                    overlay: 'white'
                });
            }

            config.push({
                image: _.template('images/shapes/planet-shadow${shadow}.png', {
                    shadow: IntRandom.get(0, 9)
                })
            });

            return config;
        }

        function generate(){
            var defer = $q.defer(),
                config = createPlanetConfig(),
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