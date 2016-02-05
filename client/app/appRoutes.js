var myapp = angular.module('appRoutes', [])
    .config(function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider){

        // For any unmatched url, send to / -> index
        $urlRouterProvider.otherwise("/")
        $locationProvider.html5Mode(true).hashPrefix('!');

        /**
         * Se estiver logado (existir token), envia token armazenado no local storage,
         * para o server, em cada request;
         *
         * Se o server devolver o response com status de erro de autenticacao, altera o
         * path e rejeita a resposta inteira.
         *
         **/
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


        $stateProvider
            .state('index', {
                url: "/",
                templateUrl: "../views/index.html"
            })
            .state('content', {
                url: "/content",
                templateUrl: "../views/content.html"
            })
            .state('video', {
                url: "/video",
                templateUrl: "../views/video.html"
            })
            .state('admin', {
                url: "/admin",
                templateUrl: "../views/admin/index-admin.html"
            })
            .state('dashboard', {
                url: "/dashboard",
                templateUrl: "../views/admin/index-dashboard.html"
        });
});