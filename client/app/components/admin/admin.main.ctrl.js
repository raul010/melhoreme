/**
 * Created by raul on 27/01/16.
 */

//inject angular file upload directives and services.
angular.module('AdminMainCtrl', [])

.controller('AdminMainController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.files = [$scope.file];
        }
    });
    $scope.log = '';

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (!file.$error) {
                    Upload.upload({
                        url: '/api/user/uploads',
                        method: 'POST',
                        data: {
                            username: $scope.username,
                            file: file
                        }
                    }).then(function (resp) {
                        $timeout(function() {
                            $scope.log = 'file: ' +
                                    resp.config.data.file.name +
                                    ', Response: ' + JSON.stringify(resp.data) +
                                    '\n' + $scope.log;
                        });
                    }, null, function (evt) {
                        var progressPercentage = parseInt(100.0 *
                                evt.loaded / evt.total);
                        $scope.log = 'progress: ' + progressPercentage +
                                '% ' + evt.config.data.file.name + '\n' +
                                $scope.log;
                    });
                }
            }
        }
    };

    //    TEMPLATES
    $scope.templates =
            [
                { name: 'Videos', url: 'admin.manager.tpl.html'},
                { name: 'Dados pessoais', url:'admin.profile.tpl.html'}
            ];
    $scope.template = $scope.templates[0];
    $scope.templateIndex = function(index) {
        $scope.template = $scope.templates[index];
    };
}]);