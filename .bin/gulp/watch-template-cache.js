/**
 * Created by raul on 13/10/15.
 */

var constants = require('./constants');
var TASK = constants.TASK;
var PATH = constants.PATH;

/**
 * Whatch templates
 *
 **/
module.exports = function (gulp, templateCache, gutil) {

    var SRC_FILE = [
        PATH.APP + '/**/*.tpl.html',
        PATH.APP + '/**/*-tpl.html'
    ];

    gulp.task(TASK.TEMPLATE_CACHE_CONFIG, function () {

        return gulp.src(SRC_FILE)
                .on('error', gutil.log)
                .pipe(templateCache('template.caches.js', {
                    module:'melhoreme',
                    transformUrl: function (url) {
                        // Deixa somente o nome do template como 'link'
                        return url.replace(/.*\//,"");
                    }
                }))
                .on('error', gutil.log)
                .pipe(gulp.dest(PATH.APP))
                .on('error', gutil.log)

    });

    gulp.task(TASK.TEMPLATE_CACHE_WATCH, function () {
        gulp.watch(SRC_FILE, [TASK.TEMPLATE_CACHE_CONFIG])
    });

};
