/**
 * Created by raul on 27/01/16.
 */

//inject angular file upload directives and services.
angular.module('AdminVideoCtrl', [])

.controller('AdminVideoController', function ($scope) {
    //    TEMPLATES
    $scope.templates =
            [
                { name: 'Video', url: '../../../views/admin/templates/dashboard-video.html'},
                { name: 'Notificações', url: '../../../views/admin/templates/dashboard-notificacoes.html'},
                { name: 'Categorias', url: '../../../views/admin/templates/dashboard-categorias.html'},
            ];
    $scope.template = $scope.templates[0];

    $scope.templateIndex = function(index) {
        $scope.template = $scope.templates[index];
    };

});