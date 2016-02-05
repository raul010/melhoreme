/**
 * Created by raul on 05/02/16.
 */
angular.module('ConfirmaSenhaDirective', [])

.directive('equals', function() {
    return {
        restrict: 'A', // only activate on element attribute

        require: '?ngModel', // get a hold of NgModelController

        link: function(scope, elem, attrs, ngModel) {

            if(!ngModel) return; // do nothing if no ng-model

            // watch own value and re-validate on change
            // $watch is fired when $digest is executed.
            scope.$watch(attrs.ngModel, function() {
                validate();
            });
            // observe the other value and re-validate on change
            // $observe are called when value changes of attributes
            attrs.$observe('equals', function (val) {
                validate();
            });

            var validate = function() {
                // values
                var val1 = ngModel.$viewValue;
                var val2 = attrs.equals;

                // set validity
                ngModel.$setValidity('equals', ! val1 || ! val2 || val1 === val2);
            };
        }
    }
});