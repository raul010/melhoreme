'use strict';
var path = require('path');

//GULP
var gulp = require('gulp-help')(require('gulp'), {
    'hideEmpty': true
});

var browserSync     = require('browser-sync').create();
var karmaServer     = require('karma').Server;
var templateCache   = require('gulp-angular-templatecache');
var cache           = require('gulp-cached');
var changed         = require('gulp-changed');
var csso            = require('gulp-csso');
var ngAnnotate      = require('gulp-ng-annotate');
var minifyHTML      = require('gulp-minify-html');
var nodemon         = require('gulp-nodemon');
var processhtml     = require('gulp-processhtml');
var protractor      = require('gulp-protractor').protractor;
var rename          = require('gulp-rename');
var sass            = require('gulp-sass');
var uglify          = require('gulp-uglify');
var gutil           = require('gulp-util');
var runSequence     = require('run-sequence');

//var uncss           = require('gulp-uncss');
//var gulpIgnore      = require('gulp-ignore');
//var del             = require('del');
//var inlineCss       = require('gulp-inline-css');

//HELPERS
var shell   = require('gulp-shell');
var argv    = require('yargs')
    // HEROKU (-m = [re]isntala modulos)
        .boolean('m')
        .default('m', false)
        .string('s')
        .boolean('d')
        .default('d', false)
        .boolean('h')
        .default('h', false)
        .argv;

require('./env');

var constants = require('./.bin/gulp/constants');
var TASK = constants.TASK;

var NODE_ENV = process.env.NODE_ENV || 'development';

console.log('gulp libs --> ' + process.env.LIBS);
console.log('*********************');
console.log(NODE_ENV);
console.log('*********************');

require('./.bin/gulp/pre-tests')(gulp, shell);
require('./.bin/gulp/build')(gulp, changed, ngAnnotate, uglify, csso, processhtml, minifyHTML, rename);
require('./.bin/gulp/backup')(gulp);
require('./.bin/gulp/run')(gulp, nodemon, browserSync, shell, argv);
require('./.bin/gulp/deploy')(gulp, shell, argv);
require('./.bin/gulp/watch-sass')(gulp, sass);
require('./.bin/gulp/watch-template-cache')(gulp, templateCache, gutil);
require('./.bin/gulp/utils')(gulp, shell, argv);

// TESTE
require('./.bin/gulp/angular-production')(gulp, changed);

//  SEQUENCE Tasks -------------------------------------------------
gulp.task(TASK.PAGERES_SNAPSHOT_$ync, function(cb) {
    runSequence(TASK.PAGERES_SNAPSHOT, TASK.EXIT_GULP, cb);
});

gulp.task(TASK.BROWSER_SYNC_RELOAD_$ync, function(cb) {
    runSequence(TASK.BROWSER_SYNC_RELOAD, TASK.EXIT_GULP, cb);
});

gulp.task(TASK.HEROKU_DEPLOY_$ync, function(cb) {
    runSequence(TASK.HEROKU_DEPLOY, TASK.EXIT_GULP, cb);
});

gulp.task(TASK.BACKUP_PROJ_$ync, function(cb) {
    runSequence(TASK.BACKUP_PROJ, TASK.EXIT_GULP, cb);
});

gulp.task(TASK.BUILD_$ync, function(cb) {
    if (argv.h) {
        runSequence(
            TASK.COPY_ALL,
            TASK.NG_ANNOTATE,
            TASK.COPY_ALL_CSS,
            TASK.MINI_CSS,
            TASK.PROCESS_HTML,
            TASK.COPY_MOD_GULPFILE,
            TASK.HEROKU_DEPLOY,
            TASK.EXIT_GULP,
            cb
        );
    } else {
        runSequence(
                TASK.COPY_ALL,
                TASK.NG_ANNOTATE,
                TASK.COPY_ALL_CSS,
                TASK.MINI_CSS,
                TASK.PROCESS_HTML,
                TASK.COPY_MOD_GULPFILE,
                TASK.EXIT_GULP,
                cb
        );
    }
});
// //// SEQUENCE Tasks -------------------------------------------


//  Run ALIAS Tasks -------------------------------------------------

gulp.task('default', '', [], null, {});

gulp.task('run', 'Inicia o NODEMON e BROWSER-SYNC |',
    [
        TASK.NODEMON,
        TASK.BROWSER_SYNC,
        TASK.SASS_WATCH,
        TASK.CSS_RESOURCES_WATCH,
        TASK.TEMPLATE_CACHE_WATCH,

        //One time on restart (before watch)
        TASK.SASS_CONFIG,
        TASK.COPY_ALL_MISC_CSS,
        TASK.TEMPLATE_CACHE_CONFIG
    ], null, {
        aliases: ['d', 'D'],
        options: {
            'd': '--> Debug Mode'
        }
    });

gulp.task('test', function(done) {
    console.log(__dirname);

    var karma = new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        browsers: ['Chrome']
    }, done);

    // karma.start();
    karma.start({}, function(exitStatus){
        if (exitStatus !== 0) {
            return process.exit.bind(process, 1);
        }
        done();
    });
});

gulp.task('test-phantom', function(done) {
    console.log(__dirname);

    var karma = new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
    }, done);

    karma.start();
});

gulp.task('e2e', function() {
    gulp.src([
        //'client/assets/libs/angular/angular.js',
        //'client/assets/libs/angular-mocks/angular-mocks.js',
        //'client/app/app-module.js',
        'tests-e2e/**/*.js'
            ])
            .pipe(protractor({
                configFile: __dirname + '/protractor.conf.js',
                args: ['--baseUrl', 'https://127.0.0.1:3000']
            }))
            .on('error', process.exit.bind(process, 1));
});

gulp.task('pre-tests', '(AINDA EM VERSÃO BETA, NÃO USAR) Start-up all requiriments to run tests |',
    [
        //TASK.NGROK_JENKINS,
        //TASK.KARMA_START,
        TASK.WEBDRIVER_START
    ],
        null, {
        aliases: ['p', 'P']
    });

gulp.task('build', 'Prepara para Deploy |', [TASK.BUILD_$ync], null, {
    aliases: ['b', 'B'],
    options: {
        'h': '--> E faz deploy (no heroku)',
        'm': '--> E força instalaçao de dependencias front end no heroku (bower install)',
    },
});

gulp.task('backup', 'Backup do projeto, exceto as dependencias|', [TASK.BACKUP_PROJ_$ync], null, {
    aliases: ['k', 'K']
    //options: {
    //    'h': '--> E faz deploy (no heroku)',
    //    'm': '--> E força instalaçao de dependencias front end no heroku (bower install)',
    //},
});

gulp.task('sass', 'Watch Sass |', [TASK.MINI_CSS], null, {
    aliases: ['s', 'S']
});

gulp.task('minify-css', 'Minifica os CSS |', [TASK.MINI_CSS], null, {
    aliases: ['mc', 'MC']
});

gulp.task('server', 'Inicia o NODEMON |' , [TASK.NODEMON], null, {
    aliases: ['n', 'N']
});

gulp.task('reload-sync', 'Faz RELOAD de todos Browsers |', [TASK.BROWSER_SYNC_RELOAD_$ync], null, {
    aliases: ['r', 'R']
});
gulp.task('heroku', 'Faz deploy no HEROKU |', [TASK.HEROKU_DEPLOY_$ync], null , {
    options: {'m': '--> força instalaçao de dependencias front end no heroku (bower install)'},
    aliases: ['h', 'H']
});

gulp.task('pageres', 'Captura IMAGENS |', [TASK.PAGERES_SNAPSHOT_$ync], null , {
    //options: {'s': '--> Site [localhost:3000]'},
    //aliases: ['p'] já tem 'p'
});


//TODO: configurar esta task na task de build
gulp.task('copy-production', 'teste', [TASK.COPY_ANGULAR_PRODUCTION], null, {
            //aliases: ['p', 'P'],
        });
