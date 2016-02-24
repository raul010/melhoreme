var User = require('../models/User.js');
var ajax = require('../util/ajax');
var email = require('../util/email');
var label = require('../util/label');
var async = require ('async');
var crypto = require('crypto');

module.exports = function accountForgot(app) {

    app.post('/forgot', function(req, res, next) {
        var userForm = {
            email: req.body.email,
            senha: req.body.senha
        };
        async.waterfall([
            function geraToken(done) {
                crypto.randomBytes(20, function(err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },

            function encontraUser(token, done) {
                User.findOne({email: userForm.email}, function(err, user) {
                    if (!user) {
                        ajax.enviaDadosParaCliente(res, false, label.validacao.EMAIL_NAO_REGISTRADO, false);
                        return next(label.validacao.EMAIL_NAO_REGISTRADO);
                        //return res.redirect('/forgot');
                    }

                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + (1000 * 60 * 60); // 1 hour

                    user.save(function(err) {
                        done(err, token, user);
                    });
                });
            },
            function enviaEmail(token, user, done) {
                email.toUser(user, function(err, dados) {

                    if (err) {
                        email.erro(err, dados);
                        ajax.enviaErroParaUsuarioDeslogado(res, label.sistema.ERRO_FORGOT_PASS, false);
                        return next(err);
                    }
                    done(err, dados);

                });
            }
        ], function(err, results) {
            if (err) {
                console.log(err);
                return next(err);
            }
            console.log(results);
            //res.redirect('/forgot');
        });
    });
};
