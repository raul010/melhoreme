//GULP
var gulp = require('gulp-help')(require('gulp'), {
    'hideEmpty': true
});

//APP
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

//HELPERS
var shell = require('gulp-shell');
var argv = require('yargs')
        .boolean('m')
        .default('m', false)
        .argv;

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: 'localhost:8080',
        open: false
    });

    gulp
        .watch([
            './public/css/*.css',
            './public/js/**/*.js',
            './public/*.html',
            './public/views/*.html'
        ])
        .on('change', browserSync.reload);
});

gulp.task('start', function () {
    nodemon({
        script: 'server.js',
        //ext: 'js html',
        env: { 'NODE_ENV': 'development' },
        ignore: [
            './*.*',
            './node_modules',
            './public'
        ]
    })
});

gulp.task('heroku-deploy', shell.task([
    'heroku config:set NODE_MODULES_CACHE=' + !argv.m,
    'heroku git:remote -a melhoreme',
    'git add .',
    'git commit -m "gulp-commit" --allow-empty',
    'git push heroku master'
]));



gulp.task('default', 'Inicia o Nodemon' , ['start']);
gulp.task('nodemonSync', 'Inicia o Nodemon e Browsersync', ['start', 'browser-sync']);
gulp.task('sync', 'Inicia Browsersync', ['browser-sync']);
gulp.task('heroku', 'Faz deploy no Heroku', ['heroku-deploy'], null , {
    options: {'m': '--(Re)instala modulos (npm install & bower install)'}
});