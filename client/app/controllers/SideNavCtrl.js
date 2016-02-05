angular.module('SideNavCtrl', [])

        .controller('SideNavControler', function ($scope, $timeout, $mdSidenav, $mdUtil,
                                                  $log, $localStorage, $location, Auth ) {

            $scope.myEnvironment = $scope;

            // Login ---------------------------------------------------

            this.perfil = function perfil () {
            };

            console.log($localStorage.token);

            this.isLogged = function isLogged () {
                if ($localStorage.token) {
                    console.log("true");
                    return true;
                } else {
                    console.log("false");
                    return false;
                }
            };

            // ----------------------------------------------------------

            // Perfil ---------------------------------------------------

            var originatorEv;
            this.openMenu = function($mdOpenMenu, ev) {
                originatorEv = ev;
                $mdOpenMenu(ev);
            };

            this.toggleNotifications = function() {

            };
            this.configuracoes = function() {
                $location.path('/admin');
            };
            this.logout = function logout() {
                Auth.logout(function (res) {
                    console.log('logout() == ok');
                });
            }

            // ----------------------------------------------------------


            // Toogle ---------------------------------------------------

            this.toggleLeft = buildToggler('left');
            this.toggleRightEmail = buildToggler('right-email');
            this.toggleRightCadastro = buildToggler('right-cadastro');




            /**
             * Build handler to open/close a SideNav; when animation finishes
             * report completion in console
             */
            function buildToggler(navID) {

                var debounceFn =  $mdUtil.debounce(function(){
                    $mdSidenav(navID)
                            .toggle()
                            .then(function () {
                                $log.debug("toggle " + navID.toUpperCase() + " is done");
                            });
                },300);
                return debounceFn;
            }

            this.close = function(side) {
                $mdSidenav(side).close()
                        .then(function () {
                            $log.debug("close " + side.toUpperCase() + " is done");
                        });
            };

            // ----------------------------------------------------------

        });