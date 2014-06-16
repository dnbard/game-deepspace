'use strict';

angular.module('evolutionApp')
    .factory('Expedition', function (Starship, IntRandom, StringRandom, ImageCache) {
        var instance = null;

        function getInstance(){
            if (!instance){
                instance = new Expedition();
            }
            return instance;
        }


        function Expedition (){
            this.starship = new Starship();

            this.colonists = IntRandom.get(1500, 2000);
            this.droids = IntRandom.get(2, 4);

            this.destination = StringRandom.solar();

            new ImageCache().get('images/yeoman.png')
                .then(function(image){
                    debugger;
                });
        }

        return { getInstance: getInstance };
  });
