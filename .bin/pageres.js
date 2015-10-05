/**
 * Created by raul on 05/10/15.
 */
var Pageres = require('pageres');

var pageres = new Pageres({delay: 2});
var argv_2 = process.argv[2];

        if(process.argv[2]) {
            pageres.src(argv_2);
        } else {
            pageres.src('google.com', ['480x320', '1024x768', 'iphone 5s'], {crop: true})
                    .src('localhost:3000', ['1280x1024', '1920x1080'])
                    .dest(__dirname);
        }
pageres.run(function (err) {
    console.log('done');
});