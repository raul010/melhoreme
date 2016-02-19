angular.module('ProgressBarInterceptorService', [])
.factory('ProgressBarInterceptor', function($q, $rootScope) {
        return {
            'request': function (config) {
                $rootScope.$broadcast('showProgress', true);
                return config;
            },
            'response': function(response) {
                $rootScope.$broadcast('showProgress', false);
                //console.log(response);
                return response;
            },
            'responseError': function(response) {
                $rootScope.$broadcast('showProgress', false);

                return $q.reject(response);
            }
        };
});