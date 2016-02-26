'use strict';
var app = angular.module('ToastAll', []);

app.controller('ToastController', function (Toast) {
    var toast = this;
    toast.message = Toast.message;
});

app.factory('Toast', function ($mdToast, $document) {
    this.message = null;

    /**
     * @param {string} message
     * @param {string} parent
     */
    this.show = function(message, parent) {
        this.message = message;
        $mdToast.show({
            controller  : 'ToastController as toast',
            templateUrl : 'toast.tpl.html',
            parent      : $document[0].querySelector(parent),
            hideDelay   : 10000,
            position    : 'top right'
        });
    };
    this.close = function() {
        $mdToast.hide();
    };
    return {
        show    : this.show,
        message : this.message,
        close   : this.close
    };
});