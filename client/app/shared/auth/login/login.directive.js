angular.module('LoginDirective', [])
.directive('mmeLogin', function () {
   return {
       restrict: 'E',
       controller: 'LoginController as loginUser',
       templateUrl: 'login.tpl.html'
   }
});