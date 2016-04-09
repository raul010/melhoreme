'use strict';
var util        = require('util');

var _           = require('lodash');
var validator 	= require('validator');
var jwt         = require('jwt-simple');
var moment      = require('moment');

var label       = require('./label');
var ajax		= require('./ajax');
var email		= require('./email');
// var config		= require('./config');


module.exports.validaDados = validaDados;
//module.exports.captcha = captcha;
module.exports.isLoggedIn = isLoggedIn;

module.exports.createJWT = function (user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    // return jwt.encode(payload, config.TOKEN_SECRET);
    return jwt.encode(payload, process.env.TOKEN_SECRET);
};


module.exports.ensureAuthenticated = function (req, res, next) {
    var bearerHeader = req.header('Authorization');

    if (!bearerHeader) {
        return res.status(401).send({ message: label.validacao.REQUISICAO_INCONSISTENTE });
    }
    var token = req.header('Authorization').split(' ')[1];

    var payload = null;
    try {
        payload = jwt.decode(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        email.erro(err, err.message);
        return res.status(401).send({ message: err.message });
    }

    if (payload.exp <= moment().unix()) {
        return res.status(401).send({ message: label.validacao.SESSAO_EXPIROU });
    }

    req.user = payload.sub;
    next();
};

function validaDados() {
    var dadosValidados = {
        isAllOk: false,
        infos: {}
    };
    var infos = dadosValidados.infos;
    var campos = Array.prototype.slice.call(arguments);


    testaExistenciaEValidade(campos);

    /**
     * @param campos
     */
    function testaExistenciaEValidade(campos) {
        var isValid = false;

        // Encerra funcao ciclica
        if (_.isEmpty(campos)) {
            return;
        }

        var campo = campos[0][0];
        var nomeDoCampo = campos[0][1];

        if (campo) {
            isValid = validaCampo(campo, nomeDoCampo);

            if(!isValid){
                console.log('raul');
                console.log(label.validacao[nomeDoCampo + '_INVALIDO']);

                inicializaInfos(nomeDoCampo).
                push(label.validacao[nomeDoCampo + '_INVALIDO']);
            }
        } else {
            inicializaInfos(nomeDoCampo)
                    .push(util.format(label.validacao.CAMPO_VAZIO, nomeDoCampo));
        }

        campos.shift();
        return testaExistenciaEValidade(campos);
    }

    var senhaCurrent = null;


    /**
     * Deve ser acrescentado novos nomes de campo, dentro do switch
     * à cada novo campo.
     *
     * @param campo
     * @param nomeDoCampo
     */
    function validaCampo(campo, nomeDoCampo) {

        switch (nomeDoCampo) {
            case 'email':
                return validator.isEmail(campo);
            case 'password':
                senhaCurrent = campo;
                return validator.isLength(campo, {min: 6, max: undefined});
            case 'confirmaPassword':
                return validator.equals(campo, senhaCurrent);
        }
    }

    function inicializaInfos(nomeDoCampo) {
        var infos = infos[nomeDoCampo];

        if (!infos) {
            infos = [];
        }
        return infos;
    }

    dadosValidados.isAllOk = _.isEmpty(infos);

    return dadosValidados;
}

//function ensureAuthorized(req, res, next) {
//    var JWT_SECRET = req.app.get('jwt_secret')
//
//    var bearerToken;
//    var bearerHeader = req.headers['authorization'];
//
//    if (typeof bearerHeader !== 'undefined') {
//        var bearer = bearerHeader.split(' ');
//        bearerToken = bearer[1];
//        // verify a token symmetric
//        jwt.verify(bearerToken, JWT_SECRET, function(err, decoded) {
//            if(err) {
//                email.erro(err);
//                res.sendStatus(403);
//            }
//            console.log(decoded); // bar
//            req.token = decoded;
//            next();
//        });
//    } else {
//        email.erro('ensureAuthorized');
//        res.sendStatus(403);
//    }
//}



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        console.log('isLoggedIn ==> req.isAuthenticated()');
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/');
}
