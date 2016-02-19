angular.module('SignupDirective', [])
        .directive('mmeSignup', function () {
            return {
                restrict: 'E',
                controller: 'SignupController as signupUser',
                templateUrl: 'signup.tpl.html'
            }
        });