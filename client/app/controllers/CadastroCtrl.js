'use strict';

angular
    .module('CadastroCtrl', [])
    .controller('CadastroControler', function($scope, $rootScope, $localStorage, $timeout, $http, Auth, ezfb) {
        this.user = {
            username: '',
            email: '',
            phone: '',
            address: ''
        };

    this.signup = function signup() {
        Auth.signup(this.user, function(res) {
            if (res.data.type === false) {
                console.log('res.data.type === false');
                console.log('res.data: ');
                console.log(res.data);

            } else {
                console.log('res.data: ');
                console.log(res.data);

                $localStorage.token = res.data.token;
                //window.location = "/"
            }

        }, function() {
            // TODO[RAUL] $https.post ERROR to server
            $rootScope.error = 'FATAL ERROR';
            console.log('FATAL ERROR');
        })
    };

    this.signin = function signin() {
        Auth.signin(this.user, function(res) {
            if (res.data.type === false) {
                console.log('res.data.type === false');
                console.log('res.data: ');
                console.log(res.data);

            } else {
                console.log('res.data: ');
                console.log(res.data);

                $localStorage.token = res.data.token;
                //window.location = "/"
            }
        }, function() {
            // TODO[RAUL] $https.post ERROR to server
            $rootScope.error = 'FATAL ERROR';
            console.log('FATAL ERROR');
        })
    };


    this.me = function me() {
        Auth.me(function () {
            console.log('/me == ok');
        }, function() {
            // TODO[RAUL] $https.post ERROR to server
            $rootScope.error = 'FATAL ERROR';
            console.log('FATAL ERROR');
        })
    };

    this.logout = function logout() {
        Auth.logout(function (res) {
            console.log('logout() == ok');
        })
    };


    this.authFacebook = function authFacebook() {
        Auth.authFacebook(function(res) {
            if (res.data.type === false) {
                console.log('res.data.type === false');
                console.log('res.data: ');
                console.log(res.data);

            } else {
                console.log('res.data: ');
                console.log(res.data);

                //$localStorage.token = res.data.token;
                //window.location = "/"
            }

        }, function() {
            // TODO[RAUL] $https.post ERROR to server
            $rootScope.error = 'FATAL ERROR';
            console.log('FATAL ERROR');
        })
    };

    updateLoginStatus(updateApiMe);

    $scope.login = function () {
        /**
         * Calling FB.login with required permissions specified
         * https://developers.facebook.com/docs/reference/javascript/FB.login/v2.0
         */
        ezfb.login(function (res) {
            /**
             * no manual $scope.$apply, I got that handled
             */
            if (res.authResponse) {
                updateLoginStatus(updateApiMe);
            }
        }, {scope: 'email,user_likes'});
    };

    $scope.logout = function () {
        /**
         * Calling FB.logout
         * https://developers.facebook.com/docs/reference/javascript/FB.logout
         */
        ezfb.logout(function () {
            updateLoginStatus(updateApiMe);
        });
    };

    $scope.share = function () {
        ezfb.ui(
                {
                    method: 'feed',
                    name: 'angular-easyfb API demo',
                    picture: 'http://plnkr.co/img/plunker.png',
                    link: 'http://plnkr.co/edit/qclqht?p=preview',
                    description: 'angular-easyfb is an AngularJS module wrapping Facebook SDK.' +
                    ' Facebook integration in AngularJS made easy!' +
                    ' Please try it and feel free to give feedbacks.'
                },
                function (res) {
                    // res: FB.ui response
                }
            );
        };


    /**
     * For generating better looking JSON results
     */
    var autoToJSON = ['loginStatus', 'apiMe'];
    angular.forEach(autoToJSON, function (varName) {
        $scope.$watch(varName, function (val) {
            //$scope[varName + 'JSON'] = JSON.stringify(val, null, 2);
            console.log(val);
        }, true);
    });

    /**
     * Update loginStatus result
     */
    function updateLoginStatus (more) {
        ezfb.getLoginStatus(function (res) {
            $scope.loginStatus = res;

            (more || angular.noop)();
        });
    }

    /**
     * Update api('/me') result
     */
    function updateApiMe () {
        ezfb.api('/me', function (res) {
            $scope.apiMe = res;
        });
    }

});