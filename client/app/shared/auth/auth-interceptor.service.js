angular
    .module('AuthInterceptorService', [])
    .factory('authInterceptorService', authInterceptorService);

function authInterceptorService ($q, $location, $localStorage) {
    return {
        'request': function (config) {
            config.headers = config.headers || {};
            if ($localStorage.token) {
                config.headers.Authorization = 'Portador ' + $localStorage.token;
            }
            return config;
        },
        'response': function (response) {
            //console.log(response);
            return response;
        },
        'responseError': function(response) {
            if(response.status === 401 || response.status === 403) {
                $location.path('/');
            }
            return $q.reject(response);
        }
    };
}