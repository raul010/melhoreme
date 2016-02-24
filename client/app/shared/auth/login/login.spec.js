var module = angular.mock.module;

describe('LoginController', function() {

    var controller = null;
    var user = null;
    var $scope = null;

    beforeEach(function () {
        module('LoginCtrl');
    });

    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();

        controller = $controller('LoginController', {
            $scope: $scope
        });
    }));

    beforeEach(inject(function(_user_) {
        user = _user_;
    }));

    //beforeEach(module(function($localStorageProvider) {
    //    //console.log('in', $localStorage.deferIntercept());
    //    //$urlRouterProvider.deferIntercept();
    //}));

    it('initially has a greeting', function () {
        var loginUser = $scope;
        loginUser.user = user.login;

        console.log(loginUser.user);

        //expect($scope.strength).to.equal('strong');
    });
});
