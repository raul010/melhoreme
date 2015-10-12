'use strict';

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

// CONSTANSTs
var START = 'start';
var EXIT_GULP = 'exit-gulp';
var BROWSER_SYNC = 'browser-sync';

var INLINE = 'inline';

var SAAS_CONFIG = 'saas-config';
var SASS_WATCH = 'sass:watch';
var CSS_SRC_WATCH = 'watch:copy-src';

var BROWSER_SYNC_RELOAD_$ync = 'browser-sync-reload-SYNC';
var BROWSER_SYNC_RELOAD = 'browser-sync-reload';

var HEROKU_DEPLOY_$ync = 'heroku-deploy-SYNC';
var HEROKU_DEPLOY = 'heroku-deploy';

var PAGERES_SNAPSHOT_$ync = 'pageres-snapshot-SYNC';
var PAGERES_SNAPSHOT = 'pageres-snapshot';

var BUILD_$ync          = 'build_SYNC';
var COPY_ALL            = 'copy-all';
var NG_ANNOTATE         = 'annotate';
var MINI_CSS            = 'mini-css';
var MINI_JS             = 'mini-js';
var COPY_SRC_CSS_BUILD  = 'copy-src-css-build';
var PROCESS_HTML        = 'process-html';
var CLEAN               = 'clean';
var MINIFY_HTML         = 'minify-html';
var NPM_INSTALL         = 'npm-install';

// PATHS
var PATH_PUBLIC = './public/';
var PATH_SRC = './public/src/';
var PATH_DIST = './public/dist/';

var PATH_BUILD = '../melhoreme-build/';
var PATH_BUILD_PUBLIC = '../melhoreme-build/public/';
var PATH_BUILD_SRC = '../melhoreme-build/public/src/';
var PATH_BUILD_SRC_TEMP = '../melhoreme-build/public/src/temp/';

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
        'gulpfile.js',
        'z-old.configs'
    ]
}

var _browserSync = {
    watchFiles : [
        PATH_PUBLIC + '*.html',
        PATH_PUBLIC + 'views/*.html',
        PATH_SRC    + 'css/*.css', //Reload with SAAS Task
        PATH_SRC    + 'js/**/*.js',
    ]
};

var _copyAll = {
    src : [
        '**',
        '.*',
        '!node_modules/**',
        '!z_old/**',
        '!' + PATH_SRC + '/css/**',
        '!' + PATH_SRC + '/js/**',
        '!' + PATH_SRC + '/libs/**',
        '!' + PATH_DIST + '/**'
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
    gulp.src(PATH_SRC +  'css/**/*.scss')
            //.pipe(cache('saas-cache'))
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(PATH_DIST + 'css'));
});
gulp.task(SASS_WATCH, function () {
    gulp.watch(PATH_SRC +  'css/**/*.scss', [SAAS_CONFIG])
            .on('change', browserSync.reload);

});
// copy all misc (non scss)
gulp.task('copy-src-css', function () {
    gulp.src([
            PATH_SRC +  'css/**/*.*',
            '!' + PATH_SRC +  'css/**/*.scss'
            ])
            //.pipe(cache('watch:copy-B'))
            .pipe(gulp.dest(PATH_DIST + 'css/'));
});
gulp.task(CSS_SRC_WATCH, function () {
    gulp.watch(PATH_SRC +  'css/**/*.*', ['copy-src-css']);
});
//  ////WATCH: SRC Files----------------------------------


//  BUILD -------------------------------------------------


gulp.task(COPY_ALL, function () {
    return gulp.src(_copyAll.src)
            .pipe(changed(PATH_BUILD))
            .pipe(gulp.dest(PATH_BUILD));
});

gulp.task(NG_ANNOTATE, function () {
    return gulp.src(PATH_SRC + 'js/**/*.js')
            .pipe(changed(PATH_BUILD_SRC + 'js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(changed(PATH_BUILD_SRC + 'js'))
            .pipe(gulp.dest(PATH_BUILD_SRC + 'js'));
});

gulp.task(MINI_CSS, function() {
    return gulp.src(PATH_DIST + 'css/**/*.css')
            .pipe(uncss({
                html: [PATH_PUBLIC + 'index.html']
            }))
            .pipe(csso())
            .pipe(changed(PATH_BUILD_SRC + 'css'))
            .pipe(gulp.dest(PATH_BUILD_SRC + 'css'));
});

gulp.task(COPY_SRC_CSS_BUILD, function() {
    // Copy all non css
    gulp.src([
        PATH_DIST +  'css/**/*.*',
        '!' + PATH_DIST +  'css/**/*.css'
    ])
        .pipe(changed(PATH_BUILD_SRC + 'css/'))
        .pipe(gulp.dest(PATH_BUILD_SRC + 'css/'));
});

gulp.task(PROCESS_HTML, function () {
    var opts = {
        conditionals: true,
        spare:true
    };
    return gulp.src(PATH_BUILD_PUBLIC + 'index.html')
            .pipe(processhtml())
            .pipe(minifyHTML(opts))
            .pipe(gulp.dest(PATH_BUILD_PUBLIC));
});

//  DEPLOY -------------------------------------------------------
gulp.task(NPM_INSTALL, shell.task([
    'cd ' + PATH_BUILD + ' & npm install;'
]));

//  ////BUILD ----------------------------------------------------

//  DEPLOY -------------------------------------------------------
gulp.task(HEROKU_DEPLOY, shell.task([
    '.bin/heroku-deploy.sh ' + !argv.m
]));
//  ////DEPLOY ---------------------------------------------------


// RUN in production (in npm postinstall) ------------------------

gulp.task('minify-js-lib', function () {
    gulp.src(PATH_SRC + 'libs/**/*.min.js')
            .pipe(uglify())
            .pipe(gulp.dest(PATH_SRC + 'libs'));
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
            'npm-install',
            EXIT_GULP,
            cb
    );
});




// Run ALIAS Tasks =====================================================

gulp.task('default', 'Inicia o NODEMON e BROWSER-SYNC', [START, BROWSER_SYNC, SASS_WATCH, CSS_SRC_WATCH], null, {
    //options: {'p': '--> NODE_ENV=production'},
});

gulp.task('[b]uild', 'Prepara para Deploy', [BUILD_$ync], null, {
    aliases: ['b', 'B']
});

gulp.task('[s]aas', 'Inicia compilador SCSS - CSS |', [MINI_CSS], null, {
    aliases: ['s', 'S']
});

gulp.task('[m]inify-[c]ss', 'Minifica CSS com CSSO |', [MINI_CSS], null, {
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
//    return gulp.src(PATH_BUILD_PUBLIC + 'index.html')
//            .pipe(gulp.dest(PATH_BUILD_PUBLIC));
//});

//gulp.task(CLEAN, function () {
//    return gulp.src([
//        PATH_BUILD_SRC_TEMP
//    ])
//            .pipe(clean({ force: true }))
//            .pipe(clean({ read: false }));
//});



//gulp.task('COPY_LIB_JS_BUILD', function() {
//    // Copy all non css
//    return gulp.src([
//        PATH_SRC + 'libs/**/*.min.js'
//        //'!' + PATH_DIST +  'css/**/*.css'
//    ])
//            .pipe(changed(PATH_BUILD_SRC + 'libs/'))
//            .pipe(gulp.dest(PATH_BUILD_SRC + 'libs/'));
//});
//
//gulp.task('uncss', function() {
//    return gulp.src(PATH_SRC + 'libs/*/*.min.css')
//            .pipe(uncss({
//                html: [PATH_PUBLIC + 'index.html']
//        }))
//        .pipe(csso())
//            .pipe(changed(PATH_BUILD_SRC + 'libs/'))
//            .pipe(gulp.dest(PATH_BUILD_SRC + 'libs/'));
//});