/**
 * @desc Autenticacao
 * @example <mme-signup></mme-signup>
 */

angular.module('SignupDirective', [])
        .directive('mmeSignup', mmeSignup);

function mmeSignup () {
    return {
        restrict: 'E',
        controller: 'SignupController',
        controllerAs: 'signupUser',
        templateUrl: 'signup.tpl.html'
    }
};