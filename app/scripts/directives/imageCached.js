'use strict';

angular.module('evolutionApp')
    .directive('ngCached', function (ImageCache) {
        return {
            restrict: 'AE',
            link: function(scope, element, attrs) {
                var src = element.attr('data');
                new ImageCache().get(src)
                    .then(function(image){
                        element.attr('src', image);
                    });
            }
        };
    });
