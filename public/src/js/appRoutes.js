angular.module('appRoutes', [])
        .config(function($routeProvider, $locationProvider) {
            console.log('routeeees');
            $routeProvider
                .when('/video', {
                    templateUrl: '../../views/video.html',
                    controller: 'VideoController'
                })
            $locationProvider.html5Mode(true);

});