var myapp = angular.module('appRoutes', [])
    .config(function($provide, $stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, $authProvider){
        console.log('passou phase CONFIG appRoutes');

        // For any unmatched url, send to / -> index
        $urlRouterProvider.otherwise("/erro");
        $locationProvider.html5Mode(true).hashPrefix('!');

        /**
         * Se estiver logado (existir token), envia token armazenado no local storage,
         * para o server, em cada request;
         *
         * Se o server devolver o response com status de erro de autenticacao, altera o
         * path e rejeita a resposta inteira.
         *
         **/
        $httpProvider.interceptors.push('AuthInterceptor');

        // Progress Bar
        $httpProvider.interceptors.push('ProgressBarInterceptor');

        // Templates devem obrigatoriamente conter o sufixo .tpl.html
        // e so o nome do arquivo, sem qualquer path.
        // Sempre deve estar na pasta ou alguma subpasta de app.

        $stateProvider
            .state('index', {
                url: "/",
                templateUrl: 'home.tpl.html',
                controller: 'HomeController as home'

            }).state('content', {
                url: "/content",
                templateUrl: 'content.tpl.html'

            }).state('watch', {
                url: "/watch",
                templateUrl: 'watch.tpl.html'

            }).state('admin', {
                url: "/admin",
                templateUrl: 'admin.main.tpl.html',
                controller: 'AdminMainController as admin'

            }).state('dashboard', {
                url: "/dashboard",
                templateUrl: 'dashboard.main.tpl'

            }).state('forgot', {
                url: "/forgot",
                templateUrl: 'forgot.tpl.html'




            //}).state('home', {
            //    url: '/',
            //    controller: 'HomeCtrl',
            //    templateUrl: 'partials/home.html'
            //
            //}).state('login', {
            //    url: '/login',
            //    templateUrl: 'partials/login.html',
            //    controller: 'LoginCtrl',
            //    resolve: {
            //        skipIfLoggedIn: skipIfLoggedIn
            //    }
            //
            //}).state('signup', {
            //    url: '/signup',
            //    templateUrl: 'partials/signup.html',
            //    controller: 'SignupCtrl',
            //    resolve: {
            //        skipIfLoggedIn: skipIfLoggedIn
            //    }
            //
            //}).state('logout', {
            //    url: '/logout',
            //    template: null,
            //    controller: 'LogoutCtrl'
            //
            //}).state('profile', {
            //    url: '/profile',
            //    templateUrl: 'partials/profile.html',
            //    controller: 'ProfileCtrl',
            //    resolve: {
            //        loginRequired: loginRequired
            //    }
        });

        //$authProvider.facebook({
        //    clientId: '889527204478135'
        //});
        //
        //$authProvider.github({
        //    clientId: '5493d9012790244fcb4d'
        //});
        //
        //
        //function skipIfLoggedIn($q, $auth) {
        //    var deferred = $q.defer();
        //    if ($auth.isAuthenticated()) {
        //        deferred.reject();
        //    } else {
        //        deferred.resolve();
        //    }
        //    return deferred.promise;
        //}
        //
        //function loginRequired($q, $location, $auth) {
        //    var deferred = $q.defer();
        //    if ($auth.isAuthenticated()) {
        //        deferred.resolve();
        //    } else {
        //        $location.path('/login');
        //    }
        //    return deferred.promise;
        //}
});