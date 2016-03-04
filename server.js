var express = require ('express');
var app = express();

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: '.'});
});

app.use(express.static('.'));

app.listen('3000', function() {
   console.log('Listening port 3000...'); 
});

