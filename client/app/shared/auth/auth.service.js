'use strict';

angular.module('AuthService', [])
    .factory('Auth', function($http, $localStorage){

        // token do $localStorage (vindo do server) para user
        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            // LOG -----------------------------------
            console.log(' getUserFromToken vvv ');
            console.log(user);
            //----------------------------------------

            return user;
        }

        var currentUser = getUserFromToken();

        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    // TODO[RAUL]: send AUTO EMAIL to admin, if reached this point
                    throw 'Chain of characters base64url invalid!';
            }
            return window.atob(output);
        }

        var a = 0;

        console.log('AUTH*************************');
        return {
            a: ++a,
            signup: function(data, success, error) {
                $http.post('/signup', data).then(success, error)
            },
            login: function(data, success, error) {
                $http.post('/auth/login', data).then(success, error)
            },
            me: function(success, error) {
                $http.get('/api/me').then(success, error)
            },
            logout: function(success) {
                changeUser({});
                delete $localStorage.token;
                success();
            },
            data : null
        };
    }
);