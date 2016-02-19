var app = angular.module('HeaderCtrl', []);

app.directive('mmeHeader', function ()  {
    return {
        restrict: 'E',
        templateUrl: 'header.tpl.html',
        controller: 'HeaderController as header'
    };
});

app.controller('HeaderController', function ($scope, $location,Auth, Sidenav) {
    var header = this;
    header.sidenav = Sidenav;


    header.perfil = function () {
    };

    // Perfil ---------------------------------------------------

    var originatorEv;
    header.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };

    header.toggleNotifications = function() {

    };
    header.configuracoes = function configuracoes() {
        $location.path('/admin');
    };

    // Emit para o scope pai = CadastroCtrl
    header.me = function me() {
        Auth.me(function (res) {
            console.log(res);

        }, function (error) {
            console.log('ERRO');
        })
    };

    header.logout = function logout() {
        Auth.logout(function (res) {
            console.log('logout() == ok');
        });
    }

});
