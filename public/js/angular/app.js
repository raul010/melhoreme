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

        $mdThemingProvider.definePalette('custom-green', {
            "50":"#e6ebed",
            "100":"#b3c3c8",
            "200":"#819ba4",
            "300":"#577986",
            "400":"#2d5767",
            "500":"#033649",
            "600":"#032f40",
            "700":"#022937",
            "800":"#02222e",
            "900":"#021b25",
            "A100":"#b3c3c8",
            "A200":"#819ba4",
            "A400":"#2d5767",
            "A700":"#022937",
            /*
            'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
            // on this palette should be dark or light
            'contrastDarkColors': ['600 700 800 900'],
            'contrastLightColors': ['600 700']    // could also specify this if default was 'dark'
*/
        });


        $mdThemingProvider.theme('mainTheme')
                .primaryPalette('custom-green', {
                    //'default': '50'
                })
                .accentPalette('blue-grey')
                .warnPalette('orange');
        //
        //$mdThemingProvider.theme('mainTheme')
        //        .primaryPalette('green', {
        //            'hue-1': '300',
        //            'hue-2': '400',
        //            'hue-3': '600'
        //        })
        //        .accentPalette('blue-grey')
        //        .warnPalette('orange');


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