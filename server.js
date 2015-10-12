var express         = require('express');
var app             = express();
var morgan          = require('morgan')
var compress        = require('compression')
var mongoose        = require('mongoose');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

var db              = require('./config/db');

var port = process.env.PORT || 8080; // set our port

var NODE_ENV = process.env.NODE_ENV || 'development';
console.log('*********************************');
console.log(app.get('env'));
console.log('*********************************');
//mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// CONFIG'S ----------------------------------------
if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
    //require('pmx').init();

} else if (NODE_ENV === 'production') {
    app.use(compress());
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(methodOverride()); // DELETE/PUT


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// PUBLIC CONSTANT
app.set('dir_public', __dirname + '/public')

if (NODE_ENV === 'development') {
    app.use(express.static(app.get('dir_public')));

} else if (NODE_ENV === 'production') {
    app.use(express.static(app.get('dir_public'), {maxAge: '3d'}));
}

require('./app/routes')(app);

app.listen(port);
console.log('Magic happens on port ' + port);
exports = module.exports = app;
