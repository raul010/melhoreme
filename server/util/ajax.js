"use strict";

var garante = require('./garante')

/**
 * Envia dados para o browser
 *
 * @param {Object} res
 * @param {Boolean} isSuccess
 * @param {Object} message
 * @param {Object} [hasCaptcha]
 * @param {String} [token]
 */
module.exports.enviaDados = function (res, isSuccess, message, hasCaptcha, token) {
    console.log("enviaDadosParaCliente");

    garante.tipoDaAtribuicao(hasCaptcha, 'boolean');
    garante.tipoDaAtribuicao(token, 'string');

    if(!isSuccess) res.status(401);

    res.json({
        isSuccess   : isSuccess,
        message     : message,
        hasCaptcha  : hasCaptcha || false,
        token       : token || null
    });
};

