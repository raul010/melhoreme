'use strict';

angular
    .module('CadastroCtrl', [])
    .controller('CadastroControler', function($scope, $rootScope, $localStorage, $timeout, $http, Auth, Facebook) {
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


            // Define user empty data :/
            //$scope.user = {};

            // Defining user logged status
            $scope.logged = false;

            // And some fancy flags to display messages upon user status change
            $scope.byebye = false;
            $scope.salutation = false;

            /**
             * Watch for Facebook to be ready.
             * There's also the event that could be used
             */
            $scope.$watch(
                    function() {
                        return Facebook.isReady();
                    },
                    function(newVal) {
                        if (newVal)
                            $scope.facebookReady = true;
                    }
            );

            var userIsConnected = false;

            Facebook.getLoginStatus(function(response) {
                console.log("Facebook.getLoginStatus | response.status =>");
                console.log(response.status);
                if (response.status == 'connected') {
                    userIsConnected = true;
                }
            });

            /**
             * IntentLogin
             */
            $scope.intentLogin = function() {
                console.log('$scope.IntentLogin userIsConnected => ');
                console.log(userIsConnected);
                if(!userIsConnected) {
                    $scope.login();
                }
            };

            /**
             * Login
             */
            $scope.login = function() {
                Facebook.login().then(
                        function(response) {
                            console.log('$scope.login .response => ');
                            console.log(response);
                            if (response.status == 'connected') {
                                $scope.logged = true;
                                $scope.meFb();
                            }

                        }, {
                            scope: 'email',
                            //return_scopes: true
                        }
                );
            };

            /**
             * me
             */
            $scope.meFb = function() {
                Facebook.api('/me', function(response) {
                    console.log('$scope.me response => ');
                    console.log(response);
                    /**
                     * Using $scope.$apply since this happens outside angular framework.
                     */
                    $scope.$apply(function() {
                        $scope.user = response;
                    });

                });
                Facebook.api('/me/permissions', function(response) {
                    console.log('/me/permissions response => ');
                    console.log(response);
                });
            };

            /**
             * Logout
             */
            $scope.logout = function() {
                console.log(' $scope.logout');
                Facebook.logout(function() {
                    $scope.$apply(function() {
                        $scope.user   = {};
                        $scope.logged = false;
                    });
                });
            };

            /**
             * Taking approach of Events :D
             */
            $scope.$on('Facebook:statusChange', function(ev, data) {
                console.log('Status: ', data);
                if (data.status == 'connected') {
                    $scope.$apply(function() {
                        $scope.salutation = true;
                        $scope.byebye     = false;
                    });
                } else {
                    $scope.$apply(function() {
                        $scope.salutation = false;
                        $scope.byebye     = true;

                        // Dismiss byebye message after two seconds
                        $timeout(function() {
                            $scope.byebye = false;
                        }, 2000)
                    });
                }


            });



});