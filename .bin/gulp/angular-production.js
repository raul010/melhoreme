/**
 * Created by raul on 13/10/15.
 */

var constants = require('./constants');
var TASK = constants.TASK;
var PATH = constants.PATH;
var SPECS = constants.SPECS;

module.exports = function angularProduction (gulp, changed) {
    console.log(PATH.APP);
    console.log(SPECS.gulpProduction);

    gulp.task(TASK.COPY_ANGULAR_PRODUCTION, function () {
        return gulp.src(SPECS.gulpProduction)
                .pipe(gulp.dest(PATH.APP));
    });
};