angular.module('SidenavService', [])
.factory('Sidenav', function ($mdUtil, $mdSidenav, $log, CONST) {

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
        console.log(navID);

        var debounceFn = $mdUtil.debounce(function() {
            $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug('toggle ' + navID.toUpperCase() + ' is done');
                    });
        },300);
        return debounceFn;
    }

    return {
        toggle : {
            left : buildToggler('left'),
            rightLogin : buildToggler(CONST.SIDENAV.RIGHT_LOGIN),
            rightCadastro : buildToggler(CONST.SIDENAV.RIGHT_CADASTRO)
        },

        close:  function(side) {
            $mdSidenav(side).close()
                    .then(function () {
                        $log.debug('close ' + side.toUpperCase() + ' is done');
                    });
        }
    };
});