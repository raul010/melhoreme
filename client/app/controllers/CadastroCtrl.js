'use strict';

angular
    .module('CadastroCtrl', [])
    .controller('CadastroControler', function($rootScope, Auth, $localStorage) {
        var cad = this;

        cad.user = {
            //username: '',
            email:              'raul.abreu.leite@gmail.com',
            senha:              '123456',
            confirmaSenha:      '123456',
            //phone: '',
            //address: ''
        };
    // Cadastro
        cad.signup = function signup() {

        Auth.signup(cad.user, function(res) {
            // Se voltar algum erro do Servidor
            if (res.data.type === false) {
                console.log(res.data);
            } else {

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

        cad.signin = function signin() {
        Auth.signin(cad.user, function(res) {
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


    cad.me = function me() {
        Auth.me(function () {
            console.log('/me == ok');
        }, function() {
            // TODO[RAUL] $https.post ERROR to server
            $rootScope.error = 'FATAL ERROR';
            console.log('FATAL ERROR');
        })
    };

    cad.logout = function logout() {
        Auth.logout(function (res) {
            console.log('logout() == ok');
        })
    };
});