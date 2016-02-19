var _       = require('lodash');
var email   = require('./email');

//Garante ...
/**
 * Garante que caso 'dados' esteja atribuido (ou seja, nao undefined ou null),
 * seja do tipo esperado.
 *
 * @param dados - qualquer tipo
 * @param type {string} - tipo esperado
 */
module.exports.tipoDaAtribuicao = function (dados, type) {
// Garantia que evita trocarem hasCaptcha pelo token

    switch (type) {
        case 'string':
            analiza(dados, _.isString);
            break;

        case 'boolean':
            analiza(dados, _.isBoolean);
            break;
    }


    function analiza(dados, isType) {
        if (!_.isNull(dados) && !_.isUndefined(dados) && !isType(dados)) {
            var msg = dados + ' deve ser' + type;

            email.erro(msg, dados);
            throw new TypeError(msg + type);
        }
    }

};