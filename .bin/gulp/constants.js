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
    COPY_ALL_MISC_CSS       : 'copy-src-css',

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

    BUILD_$ync              : 'build_SYNC',
    COPY_ALL                : 'copy-all',
    COPY_ANGULAR_PRODUCTION : 'copy-angular-production',
    NG_ANNOTATE             : 'annotate',
    MINI_CSS                : 'mini-css',
    MINI_JS                 : 'mini-js',
    PROCESS_HTML            : 'process-html',
    MINIFY_HTML             : 'minify-html',
    NPM_INSTALL             : 'npm-install',
    COPY_MOD_GULPFILE       : 'copy-modified-gulpfile',
    COPY_ALL_CSS            : 'copy-all-css',
    ECHO                    : 'echo',
    WEBDRIVER_START         : 'webdriver-start',
    KARMA_START             : 'karma-start',
    NGROK_JENKINS           : 'ngrok-jenkins'
}

// PROJECT PATHS
function PATH() {
    // DETAILS
    this.PROJECT_FOLDER_NAME = process.env.PROJECT_FOLDER_NAME;
    this.BACKUP_FOLDER       = process.env.BACKUP_FOLDER;

    // ROOT
    this.CLIENT          = process.env.CLIENT;

    // ROOT/CLIENT
    this.APP            = process.env.APP;
    this.ASSETS         = process.env.ASSETS;
    this.VIEWS          = process.env.VIEWS;

    //CONFIG
    this.BIN            = process.env.BIN;
    this.GULP           = process.env.GULP;

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
this.PATH = new PATH();

// TASKs SPECIFICATIONS
var SPECS = {

    gulpProduction: this.PATH.BIN + '/production/angular-production.js',

    _nodemon : {
        ignoreFiles : [
            // Root Folder
            'node_modules',
            this.PATH.CLIENT,
            'z_old',
            '.git',

            // Root Files
            'gulpfile.js',
            'z-old.configs'
        ]
    },
    _browserSync : {
        watchFiles : [
            this.PATH.CLIENT         + '/*.html',
            this.PATH.VIEWS          + '/**/*.html',
            this.PATH.CONTROLLERS    + '/**/*.js',
            this.PATH.SERVICES       + '/**/*.js',
            this.PATH.DIRECTIVES     + '/**/*.js',
            this.PATH.CSS            + '/**/*.*',
            this.PATH.APP            + '/*.js',


            //// Ignore
            '!' + this.PATH.SASS   + '/**', // CSS already Reload with SAAS Task
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
            '!' + this.PATH.SASS + '/**',
            '!' + this.PATH.JS   + '/**',
            '!' + this.PATH.LIBS + '/**'
            //'!' + this.PATH_ENV.CSS  + '/**/*.css'
        ]
    },

    _backup : {
        src : [
           '**/*',

            '!node_modules/**',
            '!' + this.PATH.LIBS         + '/**'
        ]
    }

}

console.log(this.PATH);

module.exports = {
    TASK:   TASK,
    PATH:   this.PATH,
    SPECS:  SPECS
}