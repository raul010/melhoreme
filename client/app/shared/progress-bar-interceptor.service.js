angular.module('ProgressBarInterceptorService', [])
.factory('progressBarInterceptorService', progressBarInterceptorService);

function progressBarInterceptorService($q, $rootScope) {
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
}