

// Karma configuration
// Generated on Thu Oct 15 2015 16:24:56 GMT-0300 (BRT)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['browserify','mocha', 'chai', 'sinon', 'chai-sinon'],

        // list of files / patterns to load in the browser
        files: [
            'client/assets/libs/angular/angular.js',
            'client/assets/libs/angular-mocks/angular-mocks.js',
            'client/assets/libs/angular-material/angular-material.js',
            'client/assets/libs/angular-animate/angular-animate.js',
            'client/assets/libs/angular-aria/angular-aria.js',
            'client/assets/libs/angular-messages/angular-messages.js',
            'client/assets/libs/angular-ui-router/release/angular-ui-router.js',
            'client/assets/libs/ngstorage/ngStorage.js',
            'client/assets/libs/ng-file-upload/ng-file-upload.js',
            'client/assets/libs/angular-recaptcha/release/angular-recaptcha.js',
            'client/assets/libs/satellizer/satellizer.js',

            //'client/assets/libs/*.js',
            'client/app/**/*.js'
        ],

        browserify: {
            debug: true
        },

        // list of files to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        //  TESTS_UNIT
        preprocessors: {
            'client/app/**/*.spec.js': ['browserify']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        browserNoActivityTimeout: 10000,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //browsers: ['PhantomJS'],
        browsers: ['PhantomJS', 'Chrome', 'Firefox', 'ChromeCanary'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
