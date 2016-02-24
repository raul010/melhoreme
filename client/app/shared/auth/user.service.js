'use strict';

angular.module('UserService', [])
    .factory('user', user);

function user () {
    return {
        login: {
            email: 'raul010@hotmail.com',
            password: '1234567',
            //email: '',
            //senha: '',
            responseCaptcha: '' // Captcha
        },

        signup: {
            email: 'raul010@hotmail.com',
            password: '123456',
            confirmaPassword: '123456',
            //email: '',
            //password: '',
            //confirmaPassword: '',
            responseCaptcha: ''
        }
    };
}
