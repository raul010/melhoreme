'use strict';

angular
        .module('AuthService', [])
        .factory('Auth', function($http, $localStorage){

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
                        throw 'Cadeia de caracteres base64url inválida!';
                }
                return window.atob(output);
            }

            function getUserFromToken() {
                var token = $localStorage.token;
                var user = {};
                if (typeof token !== 'undefined') {
                    var encoded = token.split('.')[1];
                    user = JSON.parse(urlBase64Decode(encoded));
                }
                console.log('====> ' + user);
                return user;
            }

            var currentUser = getUserFromToken();

            return {
                signup: function(data, success, error) {
                    //$http.post(baseUrl + '/signin', data).success(success).error(error)
                    $http.post('/signup', data).then(success, error)
                },
                signin: function(data, success, error) {
                    $http.post('/signin', data).then(success, error)
                },
                me: function(success, error) {
                    $http.get('/me').then(success, error)
                },
                logout: function(success) {
                    changeUser({});
                    delete $localStorage.token;
                    success();
                },
                authFacebook: function(success, error) {
                    $http.get('/auth/facebook').then(success, error);

                    //var req = {
                    //    url: '/auth/facebook',
                    //    method: 'GET',
                    //    headers: {
                    //        'Access-Control-Allow-Origin': '*',
                    //        'Access-Control-Allow-Headers': 'Origin , X-Requested-With, Content-Type, Accept, Authorization'
                    //    },
                    //}
                    //$http(req).then(success, error)
                }
            };
        }
);