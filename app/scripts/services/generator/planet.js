'use strict';

var biomes = {
    arctic: {
        colors:[
            'rgb(203, 220, 222)',
            'rgb(227, 235, 245)',
            'rgb(246, 249, 250)'
        ],
        layers:[{
            name: 'base'
        },{
            name: 'planet',
            min: 1,
            max: 3
        },{
            name: 'planet',
            min: 1,
            max: 1,
            color: 'blue'
        }]
    },
    barren: {
        colors: [
            'rgb(100, 62, 44)',
            'rgb(140, 100, 60)',
            'rgb(185, 134, 94)'
        ],
        layers: [{
            name: 'base'
        },{
            name: 'planet',
            min: 1,
            max: 4
        }, {
            name: 'planet',
            min: 0,
            max: 1,
            color: 'white'
        }]
    },
    desert: {
        colors: [
            'rgb(147, 104, 60)',
            'rgb(171, 137, 77)',
            'rgb(190, 163, 100)'
        ],
        layers: [{
            name: 'base'
        },{
            name: 'planet',
            min: 1,
            max: 4
        }, {
            name: 'planet',
            min: 0,
            max: 1,
            color: 'white'
        }]
    },
    gaia: {
        colors: [
            'rgb(107, 74, 33)',
            'rgb(122, 91, 44)',
            'rgb(141, 109, 60)'
        ],
        layers: [{
            name: 'base'
        },{
            //forest TODO: set forest colors here
            name: 'planet',
            min: 1,
            max: 3,
            color: 'green'
        },/*{
            //mountain TODO: set mountain colors here
            name: 'planet',
            count: 1,
            color: 'brown'
        },*/{
            name: 'planet',
            count: 3,
            color: 'blue'
        },{
            name: 'planet',
            count: 1,
            color: 'white'
        }]
    },
    magma: {
        colors: [
            'rgb(63, 31, 31)',
            'rgb(99, 53, 53)',
            'rgb(153, 83, 83)',
            'rgb(26, 26, 26)',
            'rgb(80, 52, 52)',
            'rgb(103, 72, 72)'
        ],
        layers: [{
            name: 'base'
        },{
            name: 'planet',
            count: 1
        },{
            name: 'planet',
            count: 1,
            color: 'red'
        }]
    },
    empty: {
        colors: [
            'rgb(89, 65, 52)',
            'rgb(124, 100, 74)',
            'rgb(167, 136, 112)'
        ],
        layers: [{
            name: 'base'
        },{
            name: 'planet',
            min: 1,
            max: 4
        }]
    }
}

angular.module('evolutionApp')
    .factory('PlanetGenerator', function ($q, ImageUtility, IntRandom) {
        function getRandomArrayElement(array){
            if (_.isArray(array)){
                return array[IntRandom.get(0, array.length - 1)];
            } else if (_.isObject(array)){
                array = Object.keys(array);
                return array[IntRandom.get(0, array.length - 1)];
            }
        }

        var handlers = {
            'base': function(array, biome, layer){
                var color = pusher.color(getRandomArrayElement(biome.colors));
                color = getRandomArrayElement(color.hueRange(20, 10)).hex6();
                array.push({
                    image: 'images/shapes/planet-base.png',
                    overlay: color
                });
            },
            'planet': function(array, biome, layer){
                var count = layer.count ? layer.count : IntRandom.get(layer.min, layer.max);
                for(var i = 0; i < count; i ++){
                    var color = layer.color? pusher.color(layer.color):
                        pusher.color(getRandomArrayElement(biome.colors));
                    color = getRandomArrayElement(color.hueRange(20, 10)).hex6();
                    array.push({
                        image: _.template('images/shapes/planet${rand}.png', {
                            rand: IntRandom.get(0, 64)
                        }),
                        overlay: color
                    });
                }
            }
        }

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

        function createPlanetConfig(biomeType){
            var biome = biomes[biomeType];
            var config = [];

            _.each(biome.layers, function(layer){
                var handler = handlers[layer.name];
                handler(config, biome, layer);
            });

            config.push({
                image: _.template('images/shapes/planet-shadow${shadow}.png', {
                    shadow: IntRandom.get(0, 9)
                })
            });

            return config;
        }

        function generate(biomeType){
            biomeType = biomeType? biomeType : getRandomArrayElement(biomes);
            var defer = $q.defer(),
                config = createPlanetConfig(biomeType),
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
