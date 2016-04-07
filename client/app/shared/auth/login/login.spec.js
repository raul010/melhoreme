describe('LoginController', LoginController);

function LoginController() {
    var module = angular.mock.module;

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

    it('initially has a greeting', function () {
        var loginUser = $scope;
        loginUser.user = user.login;

        console.log('LoginController Test')
        console.log(loginUser.user);

        //expect($scope.strength).to.equal('strong');
    });
}
