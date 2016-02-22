/**
 * Created by raul on 05/02/16.
 */
var app = angular.module('FormsEmailDirective', [])

app.directive('mmeEmailPattern', function() {
    var EMAIL_REGEXP = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    return {
        require: 'ngModel',
        restrict: '',
        link: function(scope, elem, attrs, ngModel) {
            // only apply the validator if ngModel is present and Angular has added the email validator
            if (!ngModel && !ngModel.$validators.email) return;

            // this will overwrite the default Angular email validator
            ngModel.$validators.email = function(modelValue) {
                return ngModel.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
            };
        }
    };
});