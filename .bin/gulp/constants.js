/**
 * Created by raul on 13/10/15.
 */

var path = require('path');

// TASKs NAMEs
var TASK = {

    NODEMON         : 'nodemon',
    EXIT_GULP       : 'exit-gulp',
    BROWSER_SYNC    : 'browser-sync',

    SASS_CONFIG             : 'sass-config',
    SASS_WATCH              : 'sass:watch',
    CSS_RESOURCES_WATCH     : 'watch:copy-src',

    TEMPLATE_CACHE_CONFIG   : 'templateCache-config',
    TEMPLATE_CACHE_WATCH    : 'templateCache:watch',

    BROWSER_SYNC_RELOAD_$ync    : 'browser-sync-reload-SYNC',
    BROWSER_SYNC_RELOAD         : 'browser-sync-reload',

    BACKUP_PROJ_$ync    : 'backup-proj-SYNC',
    BACKUP_PROJ         : 'backup-proj',

    HEROKU_DEPLOY_$ync  : 'heroku-deploy-SYNC',
    HEROKU_DEPLOY       : 'heroku-deploy',

    PAGERES_SNAPSHOT_$ync   : 'pageres-snapshot-SYNC',
    PAGERES_SNAPSHOT        : 'pageres-snapshot',

    BUILD_$ync          : 'build_SYNC',
    COPY_ALL            : 'copy-all',
    NG_ANNOTATE         : 'annotate',
    MINI_CSS            : 'mini-css',
    MINI_JS             : 'mini-js',
    PROCESS_HTML        : 'process-html',
    MINIFY_HTML         : 'minify-html',
    NPM_INSTALL         : 'npm-install',
    COPY_MOD_GULPFILE   : 'copy-modified-gulpfile',
    COPY_ALL_CSS        : 'copy-all-css',
    ECHO                : 'echo',
    WEBDRIVER_START     : 'webdriver-start',
    KARMA_START         : 'karma-start',
    NGROK_JENKINS       : 'ngrok-jenkins'
}

// PROJECT PATHS
function PATH_ENV() {
    // DETAILS
    this.PROJECT_FOLDER_NAME = process.env.PROJECT_FOLDER_NAME;
    this.BACKUP_FOLDER       = process.env.BACKUP_FOLDER;

    // ROOT
    this.CLIENT          = process.env.CLIENT;

    // ROOT/CLIENT
    this.APP            = process.env.APP;
    this.ASSETS         = process.env.ASSETS;
    this.VIEWS          = process.env.VIEWS;

    // ROOT/CLIENT/APP
    this.CONTROLLERS    = process.env.CONTROLLERS;
    this.SERVICES       = process.env.SERVICES;
    this.DIRECTIVES     = process.env.DIRECTIVES;
    this.TEMPLATES      = process.env.TEMPLATES;

    // ROOT/CLIENT/ASSETS
    this.CSS        = process.env.CSS;
    this.SASS       = process.env.SASS;
    this.JS         = process.env.JS;
    this.LIBS       = process.env.LIBS;

    // BUILD - ROOT
    this.BUILD_HOME     = process.env.BUILD_HOME;

    this.BUILD_TEMP     = process.env.BUILD_TEMP;
    this.BUILD_CLIENT   = process.env.BUILD_CLIENT;

    // ROOT/CLIENT
    this.BUILD_APP      = process.env.BUILD_APP;
    this.BUILD_ASSETS   = process.env.BUILD_ASSETS;

    // ROOT/CLIENT/ASSETS
    this.BUILD_CSS  = process.env.BUILD_CSS;
    this.BUILD_JS   = process.env.BUILD_JS;

    // BUILD APP (Client)
    this.BUILD_CONTROLLERS  = process.env.BUILD_CONTROLLERS;
    this.BUILD_SERVICES     = process.env.BUILD_SERVICES;

    // BUILD ASSETS

};
var PATH_ENV = new PATH_ENV();

// TASKs SPECIFICATIONS
var SPECS = {
    _nodemon : {
        ignoreFiles : [
            // Root Folder
            'node_modules',
            PATH_ENV.CLIENT,
            'z_old',
            '.git',

            // Root Files
            'gulpfile.js',
            'z-old.configs'
        ]
    },
    _browserSync : {
        watchFiles : [
            PATH_ENV.CLIENT         + '/*.html',
            PATH_ENV.VIEWS          + '/**/*.html',
            PATH_ENV.CONTROLLERS    + '/**/*.js',
            PATH_ENV.SERVICES       + '/**/*.js',
            PATH_ENV.DIRECTIVES     + '/**/*.js',
            PATH_ENV.CSS            + '/**/*.*',
            PATH_ENV.APP            + '/*.js',


            //// Ignore
            '!' + PATH_ENV.SASS   + '/**', // CSS already Reload with SAAS Task
        ]
    },

    _copyAll : {
        src : [
            '**',
            '.*',
            '*.*',

            '!node_modules/**',
            '!z_old/**',
            '!.idea/**',

            // Will be have copy build later
            '!' + PATH_ENV.SASS + '/**',
            '!' + PATH_ENV.JS   + '/**',
            '!' + PATH_ENV.LIBS + '/**'
            //'!' + PATH_ENV.CSS  + '/**/*.css'
        ]
    },

    _backup : {
        src : [
           '**/*',

            '!node_modules/**',
            '!' + PATH_ENV.LIBS         + '/**'
        ]
    }

}

console.log(PATH_ENV);

module.exports = {
    TASK:   TASK,
    PATH:   PATH_ENV,
    SPECS:  SPECS
}