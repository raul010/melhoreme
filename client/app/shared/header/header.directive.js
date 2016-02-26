(function () {
    'strict mode';
    angular
        .module('HeaderDirective', [])
        .directive('mmeHeader', mmeHeader);

    function mmeHeader()  {
        return {
            restrict: 'E',
            templateUrl: 'header.tpl.html',
            controller: 'HeaderController',
            controllerAs: 'header'
        };
    }
})();
