/**
 * Created by raul on 05/02/16.
 */

var util    = require('util');

var email   = require('../../node_modules/emailjs/email');
var config  = require('./config');

var server  = email.server.connect({
    user:       config.EMAIL_USER,
    password:   config.EMAIL_PASSWORD,
    host:       'smtp.gmail.com',
    ssl:        true
});

module.exports.erro = function erro(err, obj) {
    var text = null;
    if (obj) text = '<b>err: ' + err + '<br> obj: ' + obj;
    else text = '<b>err: ' + err;

    console.log('email:');
    console.log(text);

    var message = {
        text:    text,
        from:    'raul <raul.abreu.leite@gmail.com>',
        to:      'raul <raul.abreu.leite@gmail.com>',
        //cc:      'else <else@your-email.com>',
        subject: 'SISTEMA',
        attachment:
                [
                    {data:'<b>err: ' + err + '</b><br> obj: ' + obj, alternative:true},
                    //{path:'path/to/file.zip', type:'application/zip', name:'renamed.zip'}
                ]
    };

    // send the message and get a callback with an error or details of the message that was sent
    server.send(message, function(err, message) {
        console.log(err || message);
    });
};


module.exports.toUser = function toUser(user, fn) {

    var content = 'Clique no link abaixo para redefinir sua senha: \n\n' +
    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
    'Caso voce nao tenha feito nenhuma solicitação desse tipo, simplesmente desconsidere este email, por gentileza.\n'

    var message = {
        text:    'textttt',
        from:    'raul <raul.abreu.leite@gmail.com>',
        to:      user.email,
        subject: 'Troca de Senha',
        attachment:
                [
                    {data:content, alternative:true},
                    //{path:'path/to/file.zip', type:'application/zip', name:'renamed.zip'}
                ]
    };

    // send the message and get a callback with an error or details of the message that was sent
    server.send(message, function(err, message) {
        if (err) {
            fn(err);
        } else {
            fn(null, message);
        }
    });
};