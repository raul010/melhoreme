'use strict';

module.exports.validacao = {
    CAMPO_VAZIO             : 'O campo de %s precisa ser preenchido',
    email_INVALIDO          : 'O email informado não é válido',
    senha_INVALIDO          : 'A senha deve ter pelo menos 6 caracteres',
    confirmaSenha_INVALIDO  : 'A confirmação da senha e a senha não batem',
    USUARIO_REGISTRADO      : 'Ops, usuário cadastrado. Efetue o login!',
    USUARIO_NAO_ENCONTRADO  : 'Ops, usuário não encontrado! Faça um cadastro, por gentileza!',
    LOGIN_INVALIDO          : 'Ops, email ou senha errado. Tente novamente, por favor!',
    EMAIL_NAO_REGISTRADO    : 'Ops, o email informado não está registrado!',
    REQUISICAO_INCONSISTENTE: 'Ocorreu um erro em seu browser! Sua requisição está inconsistente',
    SESSAO_EXPIROU          : 'Sua sessão expirou, favor efetuar login novamente!'
};

module.exports.sistema = {
    ERRO_SISTEMA        : 'Erro de sistema! Informe-nos, por gentileza, se ocorreu algum transtorno.',
    ERRO_CAPTCHA        : 'Não foi possível validar o captcha',
    ERRO_FORGOT_PASS    : 'Erro na recurepaçao! Informe-nos, por gentileza, se ocorreu algum transtorno.'
};

