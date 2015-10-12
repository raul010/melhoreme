'use strict';
var path = require('path');
//GULP
var gulp = require('gulp-help')(require('gulp'), {
    'hideEmpty': true
});
var runSequence = require('run-sequence');

//APP
var nodemon         = require('gulp-nodemon');
var browserSync     = require('browser-sync').create();
var sass            = require('gulp-sass');
var csso            = require('gulp-csso');
var ngAnnotate      = require('gulp-ng-annotate');
var uglify          = require('gulp-uglify');
var processhtml     = require('gulp-processhtml');
var changed         = require('gulp-changed');
var cache           = require('gulp-cached');
var clean           = require('gulp-clean');
var minifyHTML      = require('gulp-minify-html');
var uncss           = require('gulp-uncss');


//HELPERS
var shell   = require('gulp-shell');
var argv    = require('yargs')
    // HEROKU (-m = [re]isntala modulos)
        .boolean('m')
        .default('m', true)
        .string('s')
    //.boolean('p')
    //.default('p', false)
        .argv;

// TASKs NAMEs
var START           = 'start';
var EXIT_GULP       = 'exit-gulp';
var BROWSER_SYNC    = 'browser-sync';

var SAAS_CONFIG             = 'saas-config';
var SASS_WATCH              = 'sass:watch';
var CSS_RESOURCES_WATCH     = 'watch:copy-src';

var BROWSER_SYNC_RELOAD_$ync    = 'browser-sync-reload-SYNC'
var PAGERES_SNAPSHOT_$ync       = 'pageres-snapshot-SYNC';
var HEROKU_DEPLOY_$ync          = 'heroku-deploy-SYNC';
var BUILD_$ync                  = 'build_SYNC';

var BROWSER_SYNC_RELOAD = 'browser-sync-reload';
var HEROKU_DEPLOY       = 'heroku-deploy';
var PAGERES_SNAPSHOT    = 'pageres-snapshot';
var COPY_ALL            = 'copy-all';
var NG_ANNOTATE         = 'annotate';
var MINI_CSS            = 'mini-css';
var MINI_JS             = 'mini-js';
var COPY_SRC_CSS_BUILD  = 'copy-src-css-build';
var PROCESS_HTML        = 'process-html';
var CLEAN               = 'clean';
var MINIFY_HTML         = 'minify-html';
var NPM_INSTALL         = 'npm-install';

// name of var PATH have prefix '$'
// PROJECT PATHS
var $PROJECT_HOME = './';

var $PUBLIC = path.join($PROJECT_HOME, 'public');
var $VIEWS  = path.join($PUBLIC, 'views');
var $ASSETS = path.join($PUBLIC, 'assets');

// PROJECT BUILD PATHS
var $BUILD_HOME     = '../melhoreme-build';
var $BUILD_PUBLIC   = path.join($BUILD_HOME, 'public');
var $BUILD_ASSETS   = path.join($BUILD_PUBLIC, 'assets');

// ASSETS PATHS
var $CSS    = path.join($ASSETS,  'css');
var $SAAS   = path.join($ASSETS, $CSS, '_saas');
var $IMG    = path.join($ASSETS, 'img');
var $JS     = path.join($ASSETS, 'js');
var $LIBS   = path.join($ASSETS + 'libs');

// BUILD ASSETS PATHS
var $BUILD_CSS  = path.join($BUILD_ASSETS, 'css');
var $BUILD_IMG  = path.join($BUILD_ASSETS, 'img');
var $BUILD_JS   = path.join($BUILD_ASSETS, 'js');
var $BUILD_LIBS = path.join($BUILD_ASSETS, 'libs');


var NODE_ENV = process.env.NODE_ENV || 'development';

// VARs ---------------------------------
console.log(NODE_ENV);

var _nodemon = {
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
}

var _browserSync = {
    watchFiles : [
        $PUBLIC + '/*.html',
        $VIEWS  + '/*.html',
        $SAAS   + '/**', // CSS already Reload with SAAS Task
        $JS     + '/**/*.js',
    ]
};

var _copyAll = {
    src : [
        '**',
        '.*',
        '*.*',

        '!node_modules/**',
        '!z_old/**',

        // Will be build later
        '!' + $SAAS + '/**',
        '!' + $JS   + '/**',
        '!' + $LIBS + '/**',
        '!' + $CSS  + '/**'
    ]
};

//  Utils --------------------------------------------------
gulp.task(EXIT_GULP, function () {
    process.exit(0);
});

gulp.task(PAGERES_SNAPSHOT, shell.task([
    'node .bin/pageres.js ' + argv.s
]));
//  ////Utils ----------------------------------------------


//  RUN ----------------------------------------------------
gulp.task(START, function () {
    nodemon({
        script: 'server.js',
        ext: 'js',
        ignore: _nodemon.ignoreFiles
    }).on('restart', function (file) {
        //console.log(file);
    });
});

gulp.task(BROWSER_SYNC, function() {
    browserSync.init({
        proxy: 'localhost:8080',
        open: false
    });

    gulp
        .watch(_browserSync.watchFiles)
        .on('change', browserSync.reload);
});

gulp.task(BROWSER_SYNC_RELOAD, shell.task([
    'browser-sync reload'
]));
//  ////RUN ------------------------------------------------


//  WATCH: SRC Files ---------------------------------------
gulp.task(SAAS_CONFIG, function () {
    gulp.src($SAAS +  '/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest($CSS));
});
gulp.task(SASS_WATCH, function () {
    gulp.watch($SAAS +  '/**/*.scss', [SAAS_CONFIG])
            .on('change', browserSync.reload);

});
// copy all misc (non saas)
gulp.task('copy-src-css', function () {
    gulp.src([
            $SAAS +  '/**/*.*',
            '!' + $SAAS +  '/**/*.scss'
            ])
            //.pipe(cache('watch:copy-B'))
            .pipe(gulp.dest($CSS));
});
gulp.task(CSS_RESOURCES_WATCH, function () {
    gulp.watch($SAAS +  '/**/*.*', ['copy-src-css']);
});
//  ////WATCH: SRC Files----------------------------------


//  BUILD -------------------------------------------------


gulp.task(COPY_ALL, function () {
    return gulp.src(_copyAll.src)
            .pipe(changed($BUILD_HOME))
            .pipe(gulp.dest($BUILD_HOME));
});

gulp.task(NG_ANNOTATE, function () {
    return gulp.src($JS + '/**/*.js')
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(gulp.dest($BUILD_JS));
});

gulp.task(MINI_CSS, function() {
    return gulp.src($CSS + '/**/*.css')
            .pipe(uncss({
                html: [$PUBLIC + '/index.html']
            }))
            .pipe(csso())
            .pipe(gulp.dest($BUILD_CSS));
});

gulp.task(COPY_SRC_CSS_BUILD, function() {
    // Copy all non css
    gulp.src([
        $CSS +  '/**/*.*',
        '!' + $CSS +  '/**/*.css'
    ])
        .pipe(gulp.dest($BUILD_CSS));
});

gulp.task(PROCESS_HTML, function () {
    return gulp.src($BUILD_PUBLIC + '/index.html')
            .pipe(processhtml())
            .pipe(minifyHTML({
                conditionals: true,
                spare: true
            }))
            .pipe(gulp.dest($BUILD_PUBLIC));
});

//  DEPLOY -------------------------------------------------------
gulp.task(NPM_INSTALL, shell.task([
    'cd ' + $BUILD_HOME + ' & npm install;'
]));

//  ////BUILD ----------------------------------------------------

//  DEPLOY -------------------------------------------------------
gulp.task(HEROKU_DEPLOY, shell.task([
    '.bin/heroku-deploy.sh ' + !argv.m
]));
//  ////DEPLOY ---------------------------------------------------


// RUN in production (in npm postinstall) ------------------------

gulp.task('minify-js-lib', function () {
    gulp.src($LIBS + '/**/*.min.js')
            .pipe(uglify())
            .pipe(gulp.dest($ASSETS + 'libs'));
})

// ////RUN in production (in npm postinstall) ---------------------


// Run SEQUENCE Tasks ================================

gulp.task(PAGERES_SNAPSHOT_$ync, function(cb) {
    runSequence(PAGERES_SNAPSHOT, EXIT_GULP, cb);
});

gulp.task(BROWSER_SYNC_RELOAD_$ync, function(cb) {
    runSequence(BROWSER_SYNC_RELOAD, EXIT_GULP, cb);
});

gulp.task(HEROKU_DEPLOY_$ync, function(cb) {
    runSequence(HEROKU_DEPLOY, EXIT_GULP, cb);
});

gulp.task(BUILD_$ync, function(cb) {
    runSequence(
            COPY_ALL,
            NG_ANNOTATE,
            MINI_CSS,
            COPY_SRC_CSS_BUILD,
            PROCESS_HTML,
            'gulpfile-prod',
            'npm-install',
            EXIT_GULP,
            cb
    );
});




// Run ALIAS Tasks =====================================================

gulp.task('default', 'Inicia o NODEMON e BROWSER-SYNC', [START, BROWSER_SYNC, SASS_WATCH, CSS_RESOURCES_WATCH], null, {
    //options: {'p': '--> NODE_ENV=production'},
});

gulp.task('[b]uild', 'Prepara para Deploy', [BUILD_$ync], null, {
    aliases: ['b', 'B']
});

gulp.task('[s]aas', 'Watch SCSS |', [MINI_CSS], null, {
    aliases: ['s', 'S']
});

gulp.task('[m]inify-[c]ss', 'Minifica CSS |', [MINI_CSS], null, {
    aliases: ['mc', 'MC']
});

gulp.task('[n]odemon', 'Inicia o NODEMON |' , [START], null, {
    aliases: ['n', 'N']
});

gulp.task('[r]eload-sync', 'Faz RELOAD de todos Browsers |', [BROWSER_SYNC_RELOAD_$ync], null, {
    aliases: ['r', 'R']
});
gulp.task('[h]eroku', 'Faz deploy no HEROKU |', [HEROKU_DEPLOY_$ync], null , {
    options: {'m': '--> (Re)instala modulos (npm install & bower install)'},
    aliases: ['h', 'H']
});

gulp.task('[p]ageres', 'Captura IMAGENS de localhost:3000 |', [PAGERES_SNAPSHOT_$ync], null , {
    //options: {'s': '--> Site [localhost:3000]'},
    aliases: ['p']

});



/*
 https://github.com/miickel/gulp-angular-templatecache
 https://github.com/ben-eb/gulp-uncss
 https://github.com/darylldoyle/Gulp-Email-Creator
 https://github.com/doctyper/gulp-modernizr
 https://github.com/alexeyraspopov/gulp-complexity
 https://github.com/contra/gulp-concat

 Unit Tests

 gulp-nodeunit
 gulp-jasmine
 gulp-qunit
 gulp-mocha
 gulp-karma

 Graphics

 https://github.com/mahnunchik/gulp-responsive
 (produce syslos at different sizes for responsive websites.)
 https://github.com/rizalp/gulp-sharp
 ( fastest module for work JPEG, PNG, WebP and TIFF images.)
 https://github.com/sindresorhus/gulp-imagemin
 (image compression.)
 https://github.com/otouto/gulp-spritesmith
 (converting a set of images into a spritesheet and corresponding CSS variables.)

 Outros

 https://github.com/jsBoot/gulp-jsdoc
 https://github.com/ck86/main-bower-files
 (inject Bower packages. - Overwite)
 https://github.com/jas/gulp-preprocess

 Fim

 https://github.com/addyosmani/psi
 (PageSpeed Insights with reporting)
 https://github.com/addyosmani/tmi



 */

//
//gulp.task(MINIFY_HTML, function() {
//    var opts = {
//        conditionals: true,
//        spare:true
//    };
//
//    return gulp.src($BUILD_PUBLIC + 'index.html')
//            .pipe(gulp.dest($BUILD_PUBLIC));
//});

//gulp.task(CLEAN, function () {
//    return gulp.src([
//        $BUILD_SRC_TEMP
//    ])
//            .pipe(clean({ force: true }))
//            .pipe(clean({ read: false }));
//});



//gulp.task('COPY_LIB_JS_BUILD', function() {
//    // Copy all non css
//    return gulp.src([
//        $ASSETS + 'libs/**/*.min.js'
//        //'!' + $DIST +  'css/**/*.css'
//    ])
//            .pipe(changed($BUILD_ASSETS + 'libs/'))
//            .pipe(gulp.dest($BUILD_ASSETS + 'libs/'));
//});
//
//gulp.task('uncss', function() {
//    return gulp.src($ASSETS + 'libs/*/*.min.css')
//            .pipe(uncss({
//                html: [$PUBLIC + 'index.html']
//        }))
//        .pipe(csso())
//            .pipe(changed($BUILD_ASSETS + 'libs/'))
//            .pipe(gulp.dest($BUILD_ASSETS + 'libs/'));
//});