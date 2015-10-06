/**
 * Created by raul on 05/10/15.
 */
var Pageres = require('pageres');

var pageres = new Pageres({delay: 2})
        .src('google.com', ['480x320', '1024x768', 'iphone 5s'], {crop: false})
        .src('localhost:3000.com', ['1280x1024', '1920x1080'])
        .dest(__dirname);

pageres.run(function (err) {
    console.log('done');
});