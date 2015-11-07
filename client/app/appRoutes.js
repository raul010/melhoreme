var myapp = angular.module('appRoutes', [])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){

        // For any unmatched url, send to / -> index
        $urlRouterProvider.otherwise("/")
        $locationProvider.html5Mode(true).hashPrefix('!');

        $stateProvider
                .state('index', {
                    url: "/",
                    templateUrl: "../views/index.html"
                });
                //.state('route1.list', {
                //    url: "/list",
                //    templateUrl: "route1.list.html",
                //    controller: function($scope){
                //        $scope.items = ["A", "List", "Of", "Items"];
                //    }
                //})
                //
                //.state('route2', {
                //    url: "/route2",
                //    templateUrl: "route2.html"
                //})
                //.state('route2.list', {
                //    url: "/list",
                //    templateUrl: "route2.list.html",
                //    controller: function($scope){
                //        $scope.things = ["A", "Set", "Of", "Things"];
                //    }
                //})

        $httpProvider.interceptors.push(function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Portador ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        //$location.path('/signin');
                        $location.path('/');
                    }
                    return $q.reject(response);
                }
            };
        });
});