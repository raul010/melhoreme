app = angular.module('melhoreme');
app.config(function($compileProvider) {
    console.log('ANGULAR PRODUCTION');
    $compileProvider.debugInfoEnabled(false);

});