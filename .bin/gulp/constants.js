/**
 * Created by raul on 13/10/15.
 */

var path = require('path');

// TASKs NAMEs
var TASK = {

    START           : 'start',
    EXIT_GULP       : 'exit-gulp',
    BROWSER_SYNC    : 'browser-sync',

    SASS_CONFIG             : 'sass-config',
    SASS_WATCH              : 'sass:watch',
    CSS_RESOURCES_WATCH     : 'watch:copy-src',

    BROWSER_SYNC_RELOAD_$ync    : 'browser-sync-reload-SYNC',
    PAGERES_SNAPSHOT_$ync       : 'pageres-snapshot-SYNC',
    HEROKU_DEPLOY_$ync          : 'heroku-deploy-SYNC',
    BUILD_$ync                  : 'build_SYNC',

    BROWSER_SYNC_RELOAD : 'browser-sync-reload',
    HEROKU_DEPLOY       : 'heroku-deploy',
    PAGERES_SNAPSHOT    : 'pageres-snapshot',
    COPY_ALL            : 'copy-all',
    NG_ANNOTATE         : 'annotate',
    MINI_CSS            : 'mini-css',
    MINI_JS             : 'mini-js',
    //COPY_SRC_CSS_BUILD  : 'copy-src-css-build',
    PROCESS_HTML        : 'process-html',
    MINIFY_HTML         : 'minify-html',
    NPM_INSTALL         : 'npm-install',
    COPY_MOD_GULPFILE   : 'copy-modified-gulpfile',
    COPY_ALL_CSS        : 'copy-all-css'
}

// PROJECT PATHS
function PATH() {
    this.PROJECT_HOME    = path.normalize('./');
    this.PUBLIC          = path.join(this.PROJECT_HOME, 'public');
    this.VIEWS           = path.join(this.PUBLIC, 'views');
    this.ASSETS          = path.join(this.PUBLIC, 'assets');

    // PROJECT BUILD
    this.BUILD_HOME     = '../melhoreme-build';
    this.BUILD_PUBLIC   = path.join(this.BUILD_HOME, 'public');
    this.BUILD_ASSETS   = path.join(this.BUILD_PUBLIC, 'assets');
    this.BUILD_TEMP     = path.join(this.BUILD_HOME, 'temp');

    // ASSETS
    this.CSS    = path.join(this.ASSETS,  'css');
    this.SASS   = path.join(this.CSS, '_sass');
    this.JS     = path.join(this.ASSETS, 'js');
    this.LIBS   = path.join(this.ASSETS + 'libs');

    // BUILD ASSETS
    this.BUILD_CSS  = path.join(this.BUILD_ASSETS, 'css');
    this.BUILD_JS   = path.join(this.BUILD_ASSETS, 'js');
};

// TASKs SPECIFICATIONS
var SPECS = {
    _nodemon : {
        ignoreFiles : [
            // Root Folder
            './bin',
            './node_modules',
            './public',
            './z_old',
            '.git',

            // Root Files
            './gulpfile.js',
            './z-old.configs'
        ]
    },

    _browserSync : {
        watchFes : [
            PATH.PUBLIC + '*.html',
            PATH.VIEWS  + '/*.html',
            PATH.JS     + '/**/*.js',
            PATH.CSS    + '/**/*.*',

            //// Ignore
            '!' + PATH.SASS   + '/**', // CSS already Reload with SAAS Task
        ]
    },

    _copyAll : {
        src : [
            '**',
            '.*',
            '*.*',

            '!node_modules/**',
            '!z_old/**',
            '!\.idea/**',

            // Will be have copy build later
            '!' + PATH.SASS + '/**',
            '!' + PATH.JS   + '/**',
            '!' + PATH.LIBS + '/**'
            //'!' + PATH.CSS  + '/**/*.css'
        ]
    }

}

var PATH = new PATH();

module.exports = {
    TASK:   TASK,
    PATH:   PATH,
    SPECS:  SPECS
}