app = angular.module('SidenavDirective', []);
app.directive('mmeSidenav', function () {
    return {
        restrict: 'E',
        scope: {
        },
        //controller: 'SidenavController as sidenav',
        controller: function ($scope, Sidenav) {
            $scope.sidenav.service = Sidenav;
        },
        controllerAs: 'sidenav',

        /*
           Remontara:
           sidenav.login.tpl.html
           ou
           sidenav.signup.tpl.html
        */
        template: '<div ng-include="getContentUrl()"></div>',

        link: function (scope, elem, attrs) {
            scope.getContentUrl = function() {

                return 'sidenav.' + attrs.type + '.tpl.html';
            }
        }
    }
    });



/*
 <md-sidenav md-component-id="right-cadastro" class="md-sidenav-right md-whiteframe-z2" ng-cloak>
 <md-progress-linear  md-mode='indeterminate' style="position: absolute; z-index: 3 !important" class="md-warn" value="100" ng-if="main.showProgress"></md-progress-linear>

 <md-toolbar class="md-theme-light md-tall" layout="column">
 <div layout="row" layout-align="end start">
 <md-button ng-click="main.close('right-cadastro')" class="md-icon-button" aria-label="Close">
 <md-icon md-svg-icon="all:window_close" style="width:16px;height:16px;" hide-sm></md-icon>
 <md-icon md-svg-icon="all:window_close" hide-gt-sm></md-icon>
 </md-button>
 </div>

 <span flex></span>

 <div layout="row" >
 <h1 class="md-toolbar-tools"><i>Entrar</i></h1>
 </div>
 </md-toolbar>

 */


/*
 <md-sidenav md-component-id="right-email" md-theme="emailTheme" class="md-sidenav-right md-whiteframe-z2" ng-cloak>
 <md-toolbar class="md-tall toolbar-email" layout="column">
 <div layout="row" layout-align="end start">
 <md-button ng-click="main.close('right-email')" class="md-icon-button" aria-label="Close">
 <md-icon md-svg-icon="all:window_close" style="width:16px;height:16px;" hide-sm></md-icon>
 <md-icon md-svg-icon="all:window_close" hide-gt-sm></md-icon>
 </md-button>
 </div>

 <span flex></span>

 <div layout="row">
 <h1 class="md-toolbar-tools"><i>Cadastro</i></h1>
 </div>
 </md-toolbar>

 <mme-signup></mme-signup>
 </md-sidenav>


 */