/**
 * Created by raul on 13/10/15.
 */
var constants   = require('./constants');
var TASK        = constants.TASK;
var SPECS       = constants.SPECS;

module.exports = function run(gulp, nodemon, browserSync, shell, argv) {

    gulp.task(TASK.NODEMON, function () {
        var FLAG_DEBUG_MODE = "--debug";
        var isDebug_Mode = !argv.d;

        if (isDebug_Mode) {
            FLAG_DEBUG_MODE = "";
        }
        nodemon({
            exec: 'node ' + FLAG_DEBUG_MODE,
            script: 'server.js',
            ext: 'js',
            ignore: SPECS._nodemon.ignoreFiles
        }).on('restart', function (file) {
            //console.log(file);
        });
    });

    gulp.task(TASK.BROWSER_SYNC, function() {
        browserSync.init({
            proxy: 'https://localhost:8080',
            open: false,
            //server: "./app",
            https: {
                key: "/home/raul/Develop/ssl/melhoreme.key",
                cert: "/home/raul/Develop/ssl/melhoreme.crt"
            }
        });

        gulp
            .watch(SPECS._browserSync.watchFiles)
            .on('change', browserSync.reload);
    });

    gulp.task(TASK.BROWSER_SYNC_RELOAD, shell.task([
        'browser-sync reload'
    ]));

};