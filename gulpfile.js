//GULP
var gulp = require('gulp-help')(require('gulp'), {
    'hideEmpty': true
});
var runSequence = require('run-sequence');

//APP
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

//HELPERS
var shell = require('gulp-shell');
var argv = require('yargs')
        // HEROKU (-m = [re]isntala modulos)
        .boolean('m')
        .default('m', false)
        .argv;

// CONSTANSTs

var START = 'start';
var EXIT_GULP = 'exit-gulp';
var BROWSER_SYNC = 'browser-sync';
var BROWSER_SYNC_RELOAD = 'browser-sync-reload';

var HEROKU_DEPLOY_SYNC = 'heroku-deploy_sync';
var HEROKU_DEPLOY = 'heroku-deploy';

var PAGERES_SNAPSHOT = 'pageres-snapshot';


// CONFIGURATIONS ===================================

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
        './public/css/*.css',
        './public/js/**/*.js',
        './public/*.html',
        './public/views/*.html'
    ]
};


// CONFIG Tasks =========================================

gulp.task(EXIT_GULP, function () {
    process.exit(0);
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

gulp.task(HEROKU_DEPLOY, shell.task([
    'heroku config:set NODE_MODULES_CACHE=' + !argv.m,
    'heroku git:remote -a melhoreme',
    'git add --all',
    'git commit -m "gulp-commit" --allow-empty',
    'git push heroku master',
    '/usr/bin/google-chrome-stable --disable-gpu http://melhoreme.herokuapp.com/'
]));

gulp.task(START, function () {
    nodemon({
        script: 'server.js',
        ext: 'js',
        //nodeArgs: ['--debug'],
        env: { 'NODE_ENV': 'development' },

        // Just watch APP and CONFIG files
        ignore: _nodemon.ignoreFiles,
    }).on('restart', function (file) {
        console.log('--> ' + file);
    });
});

gulp.task(PAGERES_SNAPSHOT, shell.task([
    'node .bin/pageres.js'
]));


// Run SEQUENCE Tasks ================================

gulp.task(HEROKU_DEPLOY_SYNC, function(cb) {
    runSequence(HEROKU_DEPLOY, EXIT_GULP, cb);
});


// Run ALIAS Tasks =====================================================

gulp.task('default', 'Inicia o NODEMON e BROWSER-SYNC', [START, BROWSER_SYNC], null, {
});
gulp.task('nodemon', 'Inicia o NODEMON' , [START], null, {
    aliases: ['n']
});
//gulp.task('sync', 'Inicia BROWSER-SYNC', [BROWSER_SYNC], null, {
//    aliases: ['s']
//});
 gulp.task('sync-reload', 'ATUALIZA todos Browsers', [BROWSER_SYNC_RELOAD, EXIT_GULP], null, {
    aliases: ['r']
});
gulp.task('heroku', 'Faz deploy no HEROKU', [HEROKU_DEPLOY_SYNC], null , {
    options: {'m': '--(Re)instala modulos (npm install & bower install)'},
    aliases: ['k']

});
gulp.task('pageres', 'Faz deploy no HEROKU', [PAGERES_SNAPSHOT, EXIT_GULP], null , {
    options: {'s': '--Site'},
    aliases: ['p']

});



/*
 https://github.com/miickel/gulp-angular-templatecache
 https://github.com/sindresorhus/gulp-ngmin
 https://www.npmjs.com/package/gulp-csso/
 (Minify CSS with CSSO.)
 https://github.com/murphydanger/gulp-minify-html
 https://github.com/Wildhoney/gulp-processhtml
 https://github.com/klei/gulp-inject
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
 https://www.npmjs.com/package/gulp-cached/

 Fim

 https://github.com/addyosmani/psi
 (PageSpeed Insights with reporting)
 https://github.com/addyosmani/tmi



*/