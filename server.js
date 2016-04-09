var https          = require('https');
var fs             = require('fs');

var express        = require('express');
var app            = express();
var passport       = require('passport');
//var compress     = require('compression');
var cors           = require('cors');

var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');

var email          = require('./server/util/email');

require('./env');

var port     = process.env.PORT || 8080; // set our port
// var NODE_ENV = process.env.NODE_ENV || (process.env.NODE_ENV = 'development');
var NODE_ENV = process.env.NODE_ENV;

console.log('*********************************');
console.log('$NODE ENV [server.js] -->', NODE_ENV);
console.log('$PORT [server.js] -->', port);
console.log('*********************************');

app.set('jwt_secret', process.env.JWT_SECRET);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if (NODE_ENV === 'development') {
    mongoose.connect(
        process.env.MONGOOSE_URI_TEST, {
            user: process.env.MONGOOSE_USER_TEST,
            pass: process.env.MONGOOSE_PASS_TEST
        });

} else if (NODE_ENV === 'production') {
    mongoose.connect(
            process.env.MONGOOSE_URI, {
                user: process.env.MONGOOSE_USER,
                pass: process.env.MONGOOSE_PASS
            });
}

mongoose.connection.on('error', function(err) {
    email.erro(err, 'Erro na conexao do mongo');
    throw new Error(err);
});

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//app.use(passport.initialize());

// CONFIG'S ----------------------------------------

// SSL
var optionsSSL = {
    key                 : fs.readFileSync('.bin/ssl/melhoreme.key'),
    cert                : fs.readFileSync('.bin/ssl/melhoreme.crt'),
    requestCert         : false,
    rejectUnauthorized  : false
};

// NGINX is the proxy
app.set('trust proxy', 'loopback');
app.enable('trust proxy');

// NGINX Proxy do tasks commented
if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
    //require('pmx').init();

} else if (NODE_ENV === 'production') {
    //NGINX ja compressa
    //app.use(compress());

    // Remove
    app.use(morgan('dev'));
    app.use(cors());
    app.use(function(req, res, next) {
        console.log('x-forwarded-proto')
        var protocol = req.get('x-forwarded-proto');
        console.log('protocol -->', protocol)
        console.log('req.hostname -->', req.hostname)
        console.log('req.url -->', req.url)
        protocol === 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });

}

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// CLIENT CONSTANT
app.set('dir_client', process.env.CLIENT);

app.use(express.static(app.get('dir_client')));

require('./server/routes/index.routes')(app);

// ERROR Handling
app.use(function(err, req, res, next) {
    console.error(err.stack);
    //res.status(500).send('Something broke!');
});

//app.listen(port);
//console.log('Magic happens on port ' + port);


// require('http2').createServer(options, app).listen(8080);


var server = https.createServer(optionsSSL, app).listen(port, function() {
    console.log('If server has started via GULP RUN task:');
    console.log('server ===============================> https://localhost:8080');
    console.log('server with browser sync =============> https://localhost:3000');
    console.log('Nginx static proxy ===================> https://localhost:80');
    console.log('Nginx static proxy and browser sync ==> https://localhost:83');
});

exports = module.exports = app;
