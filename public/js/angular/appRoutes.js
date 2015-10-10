angular.module('appRoutes', [])
        .config(function($routeProvider, $locationProvider) {
            console.log('routeeees');
            $routeProvider
        //
        //// home page
        //.when('/', {
        //    templateUrl: 'views/home.html',
        //    controller: 'MainController'
        //})
        //
        .when('/video', function () {
                        console.log('oi');
                    }, {
            templateUrl: '../../views/video.html',
            controller: 'VideoController'
        })
        //
        //.when('/nerds', {
        //    templateUrl: 'views/nerd.html',
        //    controller: 'NerdController'
        //})
        //
        //.when('/geeks', {
        //    templateUrl: 'views/geek.html',
        //    controller: 'GeekController'
        //});

    $locationProvider.html5Mode(true);

});