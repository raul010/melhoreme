'use strict';
angular.module('CaptchaService', [])

.factory('Captcha', function (vcRecaptchaService) {
    return {

        response: null,
        widgetId: null,
        model: {
            key: '6Ld2EhgTAAAAALE6sdiw2Cb_Fw4FEZfd72WM95w6'
        },

        setResponse: function (response) {
            console.info('Response available: ');
            this.response = response;
        },
        setWidgetId: function (widgetId) {
            console.info('Created widget ID: %s', widgetId);
            this.widgetId = widgetId;
        },
        cbExpiration: function() {
            console.info('Captcha expired. Resetting response object');
            vcRecaptchaService.reload(this.widgetId);
            this.response = null;
        },
        reload: function () {
            // In case of a failed validation you need to reload the captcha
            // because each response can be checked just once
            vcRecaptchaService.reload(this.widgetId);
        }
    };
});