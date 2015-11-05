var myapp = angular.module('appRoutes', [])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider){

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
});