'use strict';
angular.module('LoginCtrl', [
    'app.core',
    'app.shared',
    'app.config'])

.controller('LoginController', LoginController);

function LoginController ($http, $scope, $location, $localStorage,
                          $rootScope, $auth, user, Sidenav, authService, Captcha, Toast, CONST) {

    var loginUser = this;
    loginUser.user = user.login;
    loginUser.showCaptcha = false;

    loginUser.sidenav = Sidenav;

    //Login
    loginUser.login = function login() {
        // Updated from Directive

        loginUser.user.responseCaptcha = Captcha.response;

        $auth.login(loginUser.user)
                .then(function(res) {
                    $location.path('/');
                    loginUser.showCaptcha = false;

                    Sidenav.close(CONST.SIDENAV.RIGHT_CADASTRO);

                    //$localStorage.token = res.data.token;
                })
                .catch(function(res) {
                    if (loginUser.showCaptcha) {
                        Captcha.reload();
                    }

                    loginUser.showCaptcha = res.data.hasCaptcha;

                    // Usado pelo ToastCtrl
                    Toast.show(res.data.message, '#' + CONST.ELEM.TOAST_LOGIN_ID);
                });

        //loginUser.captcha.submit();
    };

    loginUser.logout = function logout() {
        authService.logout(function (res) {
            console.log('logout() == ok');
        });
    };
}

//cad.login = function login() {
//    Auth.login(cad.userLogin, function (res) {
//        if (res.data.isSuccess === false) {
//
//            console.log('res.data.isSuccess === false');
//            console.log('res.data: ');
//            console.log(res);
//
//
//            if (cad.showCaptcha) {
//                Captcha.reload();
//            }
//
//            cad.showCaptcha = res.data.hasCaptcha;
//
//            // Usado pelo ToastCtrl
//            showToast(res, '#loginForm');
//
//        } else {
//            console.log('res.data: ');
//            console.log(res);
//            cad.showCaptcha = false;
//
//            $scope.$parent.sideNav.close('right-cadastro');
//
//            $localStorage.token = res.data.token;
//            //window.location = "/"
//        }
//    }, function () {
//        // TODO[RAUL] $https.post ERROR to server
//        $rootScope.error = 'FATAL ERROR';
//        console.log('FATAL ERROR');
//    });
//}

//
//Auth.signup(cad.userSignup, function(res) {
//    // Se voltar algum erro do Servidor
//    if (res.data.isSuccess === false) {
//        console.log(res.data);
//
//        showToast(res, "#signupForm");
//
//
//    } else {
//
//        console.log(res.data);
//        $scope.$parent.sideNav.close('right-cadastro');
//
//        $localStorage.token = res.data.token;
//        //window.location = "/"
//    }
//
//}, function() {
//    // TODO[RAUL] $https.post ERROR to server
//    $rootScope.error = 'FATAL ERROR';
//    console.log('FATAL ERROR');
//})

//cad.me = function me() {
//    Auth.me(function () {
//        console.log('/me == ok');
//    }, function() {
//        // TODO[RAUL] $https.post ERROR to server
//        $rootScope.error = 'FATAL ERROR';
//        console.log('FATAL ERROR');
//    })
//};
