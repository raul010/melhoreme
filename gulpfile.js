var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var nodemon     = require('gulp-nodemon');
var shell = require('gulp-shell')


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
    'heroku git:remote -a melhoreme',
    'git add .',
    'git commit -m "gulp-commit" --allow-empty',
    'git push heroku master'
]));

gulp.task('default', ['start']);
gulp.task('nodemonSync', ['start', 'browser-sync']);
gulp.task('herokuDeploy', ['heroku-deploy']);