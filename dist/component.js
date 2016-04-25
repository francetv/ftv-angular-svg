angular.module('ftv.components.svg', [])
    .directive('ftvSvg',  function() {
        return {
            restrict:'E',
            replace: true,
            scope: {
                svg: '='
            },
            templateUrl: '/templates/index.html',
            link: function($scope, element, attr) {
                console.log($scope.svg);
                $scope.svgPath = '/svg/sprite/sprite.svg';

                $scope.svgId = $scope.svgPath + '#' + $scope.svg;
            }
        }
    });

angular.module("ftv.components.svg.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("/svg/index.html","<svg class=\"{{svg}}\"><use xlink:href=\"{{svgId}}\"></use></svg>");}]);