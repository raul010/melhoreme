'use strict';

angular.module('UserService', [])
    .factory('user', user);

function user () {
    return {
        login: {
            email: '',
            password: '',
            //email: '',
            //senha: '',
            responseCaptcha: '' // Captcha
        },

        signup: {
            email: '',
            password: '',
            confirmaPassword: '',
            //email: '',
            //password: '',
            //confirmaPassword: '',
            responseCaptcha: ''
        }
    };
}
