angular.module('LoginDirective', [])
.directive('mmeLogin', mmeLogin);

function mmeLogin () {
    return {
        restrict: 'E',
        controller: 'LoginController',
        controllerAs: 'loginUser',
        templateUrl: 'login.tpl.html'
    }
}