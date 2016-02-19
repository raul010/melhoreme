/**
 * Created by raul on 13/10/15.
 */

var moment      = require('moment');
var constants   = require('./constants');

var TASK = constants.TASK;
var PATH = constants.PATH;
var SPECS = constants.SPECS;

module.exports = function (gulp) {

    // Copia o projeto pro destino
    gulp.task(TASK.BACKUP_PROJ, function () {
        console.log((PATH.BACKUP_FOLDER + '/' + moment().format().replace(/[:\-]/gi, '_')));
        return gulp.src(SPECS._backup.src)
            .pipe(gulp.dest(PATH.BACKUP_FOLDER + '/' + moment().format().replace(/[:\-]/gi, '_'))); // todos : OU -, por _

    });
};