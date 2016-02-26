(function () {
    'strict mode';
    angular
        .module('HeaderCtrl', [])
        .controller('HeaderController', HeaderContoller);

    function HeaderContoller ($location, authService, Sidenav) {
        var header = this;
        var originatorEv;

        header.configuracoes = configuracoes;
        header.logout = logout;
        header.me = me;
        header.openMenu = openMenu;
        header.perfil = perfil;
        header.sidenav = Sidenav;
        header.toggleNotifications = toggleNotifications;

        function configuracoes() {
            $location.path('/admin');
        }

        function logout() {
            authService.logout(function (res) {
                console.log('logout() == ok');
            });
        }

        // Emit para o scope pai = CadastroCtrl
        function me() {
            authService.me(function (res) {
                console.log(res);

            }, function (error) {
                console.log('ERRO');
            });
        }

        function openMenu ($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        }

        function perfil  () {
        }

        function toggleNotifications() {
        }
    }

})();
