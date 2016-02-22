/**
 * Created by raul on 13/10/15.
 */

var constants = require('./constants');
var TASK = constants.TASK;
var PATH = constants.PATH;
var SPECS = constants.SPECS;

module.exports = function build (gulp, changed) {

    var gulpProduction = PATH.BIN + '/production';
    // Copia o projeto pro destino
    gulp.task(TASK.COPY_ANGULAR_PRODUCTION, function () {
        return gulp.src(PATH.GULP)
                //.pipe(changed(PATH.BUILD_HOME))
                .pipe(gulp.dest(PATH.BUILD_HOME));
    });
};