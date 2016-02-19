'use strict';
angular.module('CaptchaDirective', [])
.directive('captcha', function (Captcha) {
    return {
        restrict: 'E',
        link: function (scope) {
            // Directive
            scope.captcha = Captcha;

            scope.setResponse = function (responseCaptcha){
                // Update Service
                scope.captcha.setResponse(responseCaptcha);

                // Update Controller
                scope.responseCaptcha = responseCaptcha;
            }

        },
        templateUrl: 'captcha.tpl.html'
    }
})