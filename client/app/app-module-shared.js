angular.module('app.shared', [
    'AuthService',
    'UserService',
    'CaptchaService',
    'ProgressBarInterceptorService',
    'AuthInterceptorService',

    'FormsEqualsDirective',
    'FormsEmailDirective',
    'CaptchaDirective',


    'ToastAll',

    'HeaderCtrl',
    'LoginCtrl',
    'LoginDirective',

    'SignupCtrl',
    'SignupDirective',

    //'SidenavCtrl',

    'SidenavDirective',
    'SidenavService'
]);