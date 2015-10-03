var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var nodemon     = require('gulp-nodemon');

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
})

gulp.task('nodemon-sync', ['start', 'browser-sync']);
gulp.task('default', ['start']);
