angular
    .module('CadastroCtrl', [])
    .controller('CadastroControler', function($scope, $http) {
        this.user = {
            username: '',
            email: '',
            phone: '',
            address: ''
        };
        this.cadastroEmail = function cadastroEmail() {
            $http({
                method: 'POST',
                url: '/cadastro-email'
            }).then(function successCallback(response) {
                console.log('sucesso');
            }, function errorCallback(response) {
                console.log('erro');
            });
        }
    });