'strict mode';
angular.module('app.config', [])
    .config(mdThemingConfig)
    .constant('_', window._) // lodash
    .constant('CONST', loadCONST())
    .run(runApp);

function loadCONST (){
    var CONST =  {
        ELEM: {
            TOAST_LOGIN_ID  : 'loginForm',
            TOAST_SIGNUP_ID : 'signupForm'
        },
        SIDENAV: {
            RIGHT_LOGIN     : 'right-login',
            RIGHT_CADASTRO  : 'right-cadastro'
        },
        //Para testes
        RESPONSE: {}
    };
    return CONST;
}

function mdThemingConfig ($mdThemingProvider, $mdIconProvider, $compileProvider) {
    $mdThemingProvider.definePalette('custom-green', {
        '50'   : '#e6ebed',
        '100'  : '#b3c3c8',
        '200'  : '#819ba4',
        '300'  : '#577986',
        '400'  : '#2d5767',
        '500'  : '#033649',
        '600'  : '#032f40',
        '700'  : '#022937',
        '800'  : '#02222e',
        '900'  : '#021b25',
        'A100' : '#b3c3c8',
        'A200' : '#819ba4',
        'A400' : '#2d5767',
        'A700' : '#022937',

        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
        // on this palette should be dark or light
        'contrastDarkColors': ['600 700 800 900'],
        'contrastLightColors': ['600 700']    // could also specify this if default was 'dark'
    });

    $mdThemingProvider.definePalette('custom-email', {
        '50'   : '#e6ebed',
        '100'  : '#b3c3c8',
        '200'  : '#819ba4',
        '300'  : '#577986',
        '400'  : '#2d5767',
        '500'  : '#BF3428',
        '600'  : '#032f40',
        '700'  : '#022937',
        '800'  : '#02222e',
        '900'  : '#021b25',
        'A100' : '#b3c3c8',
        'A200' : '#819ba4',
        'A400' : '#2d5767',
        'A700' : '#022937',

        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
        // on this palette should be dark or light
        'contrastDarkColors': ['600 700 800 900'],
        'contrastLightColors': ['600 700']    // could also specify this if default was 'dark'
    });


    $mdThemingProvider.theme('mainTheme')
            .primaryPalette('custom-green', {
                //'default': '50'
            })
            .accentPalette('blue-grey')
            .warnPalette('orange');

    $mdThemingProvider.theme('emailTheme')
            .primaryPalette('custom-email')
            .accentPalette('cyan')
            .warnPalette('orange');

    $mdThemingProvider.theme('orangeTheme')
            .primaryPalette('amber', {
                //'default': '50'
            })
            .accentPalette('blue-grey')
            .warnPalette('orange');

    $mdThemingProvider.theme('cadastroTheme')
            .primaryPalette('blue-grey')
            .accentPalette('cyan')
            .warnPalette('orange');


    $mdThemingProvider.setDefaultTheme('mainTheme');

    $mdIconProvider
            .iconSet('all', '../../assets/img/icons/all.svg', 24)
            .iconSet('social', '../../assets/img/icons/social.svg', 24)
            .defaultIconSet('../../assets/img/icons/all.svg', 24);
}

function runApp($rootScope, $http, $templateCache, CONST) {
    console.log('passou phase RUN');
    // use Lodash in views, ng-repeat='x in _.range(3)'
    $rootScope._ = window._;

    //Consts
    $rootScope.CONST = CONST;


    $http.get('../../assets/img/icons/all.svg', {cache: $templateCache});
}
