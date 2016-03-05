var express = require('express');
var logger = require('morgan');
var app = express();

// Log de erros
app.use(logger('dev'));

// Raiz da pasta publica
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

// Rota unica
app.get('/', function (req, res) {
    res.render('index');
});

// Porta do listen
app.listen('3000', function() {
    console.log('Listening port 3000...'); 
});


