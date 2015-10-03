angular.module('sampleApp', [
        'ngRoute',
        'ngMaterial',
        'appRoutes',

        'MainCtrl',
        'NerdCtrl',
        'NerdService',

        'GeekCtrl',
        'GeekService',
        'SideNavCtrl',
        'LoginCtrl',
        'CadastroCtrl',
        'CardsCtrl'
])

    .config(function($mdThemingProvider, $mdIconProvider) {
        //$mdThemingProvider.theme('default')
        //.primaryPalette('deep-purple')
        //.accentPalette('pink');

        $mdThemingProvider.theme('mainTheme')
                .primaryPalette('pink')
                .accentPalette('blue-grey')
                .warnPalette('orange');

        $mdThemingProvider.theme('loginTheme')
                .primaryPalette('green')
                .accentPalette('blue-grey')
                .warnPalette('orange');

        $mdThemingProvider.theme('cadastroTheme')
                .primaryPalette('blue')
                .accentPalette('blue-grey')
                .warnPalette('orange');


        $mdThemingProvider.setDefaultTheme('mainTheme');

        $mdIconProvider
            .iconSet('all', '../../img/icons/all.svg', 24)
            .iconSet('social', '../../img/icons/social.svg', 24)
            .defaultIconSet('../../img/icons/all.svg', 24);
    })

    .run(function($http, $templateCache) {
            $http.get('../../img/icons/all.svg', {cache: $templateCache});
    });



