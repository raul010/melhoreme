/**
 * Created by raul on 27/01/16.
 */
var UserUpload = function() {};

UserUpload.prototype.uploadFile = function(req) {

    var file = req.files.file;
    console.log(file);
};

module.exports = new UserUpload();