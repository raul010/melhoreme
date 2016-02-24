'use strict';
angular.module('SignupCtrl', [])

        .controller('SignupController', function(
                $http, $scope, $location, $localStorage, $rootScope, $auth, user, authService, Toast, CONST) {

            var signupUser = this;
            signupUser.user = user.signup;
            signupUser.showCaptcha = false;

            // Cadastro
            signupUser.signup = function signup() {
                signupUser.user.responseCaptcha = $scope.responseCaptcha;

                $auth.signup(signupUser.user)
                    .then(function(res) {
                        $auth.setToken(res);

                        $location.path('/');
                        $scope.$parent.home.close(CONST.SIDENAV.RIGHT_CADASTRO);
                    })
                    .catch(function(res) {
                        console.log(Toast);
                        Toast.show(res.data.message, '#' + CONST.ELEM.TOAST_SIGNUP_ID);
                        //toastr.error(response.data.message);
                    });
            };

            //signupUser.pme = function me() {
            //    Auth.me(function () {
            //        console.log('/me == ok');
            //    }, function() {
            //        // TODO[RAUL] $https.post ERROR to server
            //        $rootScope.error = 'FATAL ERROR';
            //        console.log('FATAL ERROR');
            //    })
            //};

            signupUser.logout = function logout() {
                authService.logout(function (res) {
                    console.log('signup() == ok');
                });
            };
        });

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
