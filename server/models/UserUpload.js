/**
 * Created by raul on 27/01/16.
 */
UserUpload = function() {};

UserUpload.prototype.uploadFile = function(req, res) {

    var file = req.files.file;
    console.log(file);
}

module.exports = new UserUpload();