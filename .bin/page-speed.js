var psi = require('psi');

//// get the PageSpeed Insights report
//psi('html5rocks.com', function (err, data) {
//    console.log(data);
//    console.log(data.pageStats);
//});

// output a formatted report to the terminal
psi.output(process, function (err) {
    console.log('done');
});