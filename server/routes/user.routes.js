var User					= require('../models/User.js');
var UserUpload 				= require('../models/UserUpload.js');
var email					= require('../util/email');
var validacao				= require('../util/validacao');
var label					= require('../util/label');
var ajax					= require('../util/ajax');
var config					= require('../util/config');

var reCAPTCHA   			= require('recaptcha2');
//var jwt     				= require("jsonwebtoken");
var jwt     				= require('jwt-simple');
var multipart 				= require('connect-multiparty');
var multipartMiddleware 	= multipart();
var forwarded 				= require('forwarded-for');
var requestIp 				= require('request-ip');
var async 					= require ('async');
var _                       = require('lodash');

module.exports = function(app) {
    app.post('/auth/login', function(req, res) {
        console.log('SERVER -->', req.originalUrl);

        var recaptcha = new reCAPTCHA({
            siteKey     : '6Ld2EhgTAAAAALE6sdiw2Cb_Fw4FEZfd72WM95w6',
            secretKey   : process.env.CAPTCHA_SECRET_KEY
        });

        var userForm = {
            email: 			req.body.email,
            password: 			req.body.password
        };

        console.log(userForm);

        console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
        console.log(req.headers['x-forwarded-for']);
        console.log(req.headers["x-real-ip"]);
        console.log(req.ip);
        console.log(req.ips);
        var address = forwarded(req, req.headers);
        console.log(address);
        console.log(address.ip);
        console.log(requestIp.getClientIp(req));

        async.waterfall([
            validacaoDoLogin,
            verificaErrosReferenteAoUsuarioNoBD,
            recuperaUsuario
        ], function(err, results){
            console.log('results ->', results)
            console.error('err ->', err);
        });

        function validacaoDoLogin(done) {
            var err = null;

            var dadosValidados = validacao.validaDados(
                    [userForm.email, 'email'],
                    [userForm.password, 'password']
            );

            if (dadosValidados.isAllOk) {
                return done(null);
            }

            err = dadosValidados.infos;

            ajax.enviaDados(res, false, err);
            done(err);

        }

        function verificaErrosReferenteAoUsuarioNoBD(done) {
            console.log('# verificaErrosReferenteAoUsuarioNoBD');
            User.findOne({email: userForm.email}, '+password', function(err, user) {
                if (err) {
                    ajax.enviaDados(res, false, err);
                    email.erro(err, user);
                    return done(err, user);
                }
                done(null, user);
            });

        }

        function recuperaUsuario(user, done) {
            console.log('# recuperaUsuario');
            var err = null;
            if (!user) {
                // TODO[RAUL]: implement FORGOT PASSWORD feature
                ajax.enviaDados(res, false, label.validacao.LOGIN_INVALIDO);
                return done(err, label.validacao.LOGIN_INVALIDO);
            }

            user.comparePassword(userForm.password, function(err, isMatch) {
                var entrouNoCaptcha = false;
                var hasCaptcha = false;
                var isSuccess = false;
                var dados = null;
                var token = null;
                var QTDE_SEM_CAPTCHA = 6;

                if (err) {
                    email.erro(err, user);
                    return done(err, user);
                }


                // Mantem sem, ou retira widget do captcha
                if (user.contaTentativasDeLogin <= QTDE_SEM_CAPTCHA) {
                    credenciaUsuario();
                } else {
                    // Será validado no proximo request apos o envio do widget
                    hasCaptcha = true;

                    recaptcha.validate(req.body.responseCaptcha)
                            .then(function () {
                                console.log('Captcha Validou ************');
                                credenciaUsuario();
                            })
                            .catch(function (err) {
                                // invalid
                                console.log('Captcha Falhou ************');

                                ajax.enviaDados(res, false, label.sistema.ERRO_CAPTCHA, true);
                                console.log(label.sistema.ERRO_CAPTCHA + ' ' + err);// translate error codes to human readable text

                                done(label.sistema.ERRO_CAPTCHA + ' ' + err);

                            });

                }

                function credenciaUsuario() {
                    if (isMatch) {
                        hasCaptcha 	        = false;
                        dados 				= {email: user.email};
                        token 				= user.token;
                        isSuccess 			= true;

                        // usuario credenciado !!!

                        user.contaTentativasDeLogin = 0;
                        user.tempoPrimeiraTentativa = 0;

                    } else {
                        user.contaTentativasDeLogin++;
                        dados = label.validacao.LOGIN_INVALIDO;
                    }

                    // Salva contaTentativasDeLogin
                    user.save(function (err, user1) {
                        if (err) email.erro(err, user);

                        // Nao envia widget assim que contaTentativasDeLogin zera
                        if (user.contaTentativasDeLogin <= QTDE_SEM_CAPTCHA)
                            hasCaptcha = false;
                        // Já envia o widget ao incrementar
                        else
                            hasCaptcha = true;

                        ajax.enviaDados(res, isSuccess, dados, hasCaptcha, token);

                    });

                    done(err, user);
                }

            });
        }
    });

    app.post('/auth/signup', function(req, res) {

        console.log('SERVER -->', req.originalUrl);

        console.log(req.body);

        var userForm = {
            email: 			    req.body.email,
            password: 			req.body.password,
            confirmaPassword: 	req.body.confirmaPassword
        };



        async.waterfall([
            validacaoDoCadastro,
            verificaErrosReferenteAoUsuarioNoBD,
            criaUsuario,
            salvaUsuarioNoBD,
            geraESalvaTokenDeUsuario

        ], function(err, results){
            console.log('results ->', results)
            console.error('err ->', err);
        });

        function validacaoDoCadastro(done) {

            var dadosValidados = validacao.validaDados(
                    [userForm.email, 'email'],
                    [userForm.password, 'password'],
                    [userForm.confirmaPassword, 'confirmaPassword']
            );

            if (dadosValidados.isAllOk) {
                return done(null);
            }

            ajax.enviaDados(res, false, dadosValidados.infos);
            done(dadosValidados.infos);

        }

        function verificaErrosReferenteAoUsuarioNoBD(done) {
            console.log("verificaErrosReferenteAoUsuarioNoBD");
            User.findOne({email: req.body.email}, function(err, user) {

                if (err) {


                    //app.post('/auth/signup', function(req, res) {
                    //    User.findOne({ email: req.body.email }, function(err, existingUser) {
                    //        if (existingUser) {
                    //            return res.status(409).send({ message: 'Email is already taken' });
                    //        }
                    //        var user = new User({
                    //            displayName: req.body.displayName,
                    //            email: req.body.email,
                    //            password: req.body.password
                    //        });
                    //        user.save(function(err, result) {
                    //            if (err) {
                    //                res.status(500).send({ message: err.message });
                    //            }
                    //            res.send({ token: validacao.createJWT(result) });
                    //        });
                    //    });
                    //});
                    ajax.enviaDados(res, false, label.sistema.ERRO_SISTEMA);
                    email.erro(err);

                }
                done(err, user);
            });
        }

        function criaUsuario(user, done) {
            console.log("criaUsuario");

            var userModel = {};
            var err = null;

            if (user) {
                ajax.enviaDados(res, false, label.validacao.USUARIO_REGISTRADO);

                return done(label.validacao.USUARIO_REGISTRADO);

            } else {
                userModel = new User({
                    email: 			    userForm.email,
                    password: 			userForm.password,
                    confirmaPassword: 	userForm.confirmaPassword
                });
                return done (null, userModel);
            }
        }

        function salvaUsuarioNoBD(userModel, done) {
            console.log("salvaUsuarioNoBD");

            userModel.save(function(err, user) {
                if (err) {
                    email.erro(err);
                    return done(err);
                }
                done(null, user)
            });

        }

        function geraESalvaTokenDeUsuario(user, done) {
            console.log("geraESalvaTokenDeUsuario");

            // Gera com base no email - nao mandar o objeto inteiro ou dados sensiveis
            // como password ou documento pessoal

            user.token = validacao.createJWT(user);

            user.save(function(err, result) {

                if(err) {
                    email.erro(err);
                    return done(err);

                } else {
                    ajax.enviaDados(res, true, '', false, result.token);
                    //res.send({ token: validacao.createJWT(result) });
                    done(null, user);
                }
            });
        }
    });


    // GET me
    app.get('/api/me', validacao.ensureAuthenticated, function(req, res) {
        console.log('SERVER -->', req.originalUrl);
        User.findById(req.user, function(err, user) {
            if (err) {
                ajax.enviaDados(res, false, err);
            } else {
                ajax.enviaDados(res, true, user);
            }
        });
    });

    // PUT me
    app.put('/api/me', validacao.ensureAuthenticated, function(req, res) {
        console.log('SERVER -->', req.originalUrl);

        User.findById(req.user, function(err, user) {
            if (!user) {
                return res.status(400).send({ message: label.validacao.USUARIO_NAO_ENCONTRADO });
            }
            user.displayName = req.body.displayName || user.displayName;
            user.email = req.body.email || user.email;
            user.save(function(err) {
                res.status(200).end();
            });
        });
    });

    // route for showing the profile page
    app.get('/profile', validacao.isLoggedIn, function(req, res) {
        console.log('SERVER -->', req.originalUrl);
    });

    //Upload
    app.post('/api/user/uploads',
            multipartMiddleware,
            UserUpload.uploadFile);






    //app.post('/auth/login', function(req, res) {
    //    User.findOne({ email: req.body.email }, '+password', function(err, user) {
    //        if (!user) {
    //            return res.status(401).send({ message: 'Invalid email and/or password' });
    //        }
    //        user.comparePassword(req.body.password, function(err, isMatch) {
    //            if (!isMatch) {
    //                return res.status(401).send({ message: 'Invalid email and/or password' });
    //            }
    //            res.send({ token: createJWT(user) });
    //        });
    //    });
    //});

    app.post('/auth/github', function(req, res) {
        var accessTokenUrl = 'https://github.com/login/oauth/access_token';
        var userApiUrl = 'https://api.github.com/user';
        var params = {
            code: req.body.code,
            client_id: req.body.clientId,
            client_secret: config.GITHUB_SECRET,
            redirect_uri: req.body.redirectUri
        };

        // Step 1. Exchange authorization code for access token.
        request.get({ url: accessTokenUrl, qs: params }, function(err, response, accessToken) {
            accessToken = qs.parse(accessToken);
            var headers = { 'User-Agent': 'Satellizer' };

            // Step 2. Retrieve profile information about the current user.
            request.get({ url: userApiUrl, qs: accessToken, headers: headers, json: true }, function(err, response, profile) {

                // Step 3a. Link user accounts.
                if (req.header('Authorization')) {
                    User.findOne({ github: profile.id }, function(err, existingUser) {
                        if (existingUser) {
                            return res.status(409).send({ message: 'There is already a GitHub account that belongs to you' });
                        }
                        var token = req.header('Authorization').split(' ')[1];
                        var payload = jwt.decode(token, config.TOKEN_SECRET);
                        User.findById(payload.sub, function(err, user) {
                            if (!user) {
                                return res.status(400).send({ message: 'User not found' });
                            }
                            user.github = profile.id;
                            user.picture = user.picture || profile.avatar_url;
                            user.displayName = user.displayName || profile.name;
                            user.save(function() {
                                var token = createJWT(user);
                                res.send({ token: token });
                            });
                        });
                    });
                } else {
                    // Step 3b. Create a new user account or return an existing one.
                    User.findOne({ github: profile.id }, function(err, existingUser) {
                        if (existingUser) {
                            var token = createJWT(existingUser);
                            return res.send({ token: token });
                        }
                        var user = new User();
                        user.github = profile.id;
                        user.picture = profile.avatar_url;
                        user.displayName = profile.name;
                        user.save(function() {
                            var token = createJWT(user);
                            res.send({ token: token });
                        });
                    });
                }
            });
        });
    });

    app.post('/auth/facebook', function(req, res) {
        var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
        var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
        var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
        var params = {
            code: req.body.code,
            client_id: req.body.clientId,
            client_secret: config.FACEBOOK_SECRET,
            redirect_uri: req.body.redirectUri
        };

        // Step 1. Exchange authorization code for access token.
        request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
            if (response.statusCode !== 200) {
                return res.status(500).send({ message: accessToken.error.message });
            }

            // Step 2. Retrieve profile information about the current user.
            request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
                if (response.statusCode !== 200) {
                    return res.status(500).send({ message: profile.error.message });
                } console.log(profile);
                if (req.header('Authorization')) {
                    User.findOne({ facebook: profile.id }, function(err, existingUser) {
                        if (existingUser) {
                            return res.status(409).send({ message: 'There is already a Facebook account that belongs to you' });
                        }
                        var token = req.header('Authorization').split(' ')[1];
                        var payload = jwt.decode(token, config.TOKEN_SECRET);
                        User.findById(payload.sub, function(err, user) {
                            if (!user) {
                                return res.status(400).send({ message: 'User not found' });
                            }
                            user.facebook = profile.id;
                            user.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
                            user.displayName = user.displayName || profile.name;
                            user.save(function() {
                                var token = createJWT(user);
                                res.send({ token: token });
                            });
                        });
                    });
                } else {
                    // Step 3b. Create a new user account or return an existing one.
                    User.findOne({ facebook: profile.id }, function(err, existingUser) {
                        if (existingUser) {
                            var token = createJWT(existingUser);
                            return res.send({ token: token });
                        }
                        var user = new User();
                        user.facebook = profile.id;
                        user.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                        user.displayName = profile.name;
                        user.save(function() {
                            var token = createJWT(user);
                            res.send({ token: token });
                        });
                    });
                }
            });
        });
    });

    //app.post('/auth/signup', function(req, res) {
    //    User.findOne({ email: req.body.email }, function(err, existingUser) {
    //        if (existingUser) {
    //            return res.status(409).send({ message: 'Email is already taken' });
    //        }
    //        var user = new User({
    //            displayName: req.body.displayName,
    //            email: req.body.email,
    //            password: req.body.password
    //        });
    //        user.save(function(err, result) {
    //            if (err) {
    //                res.status(500).send({ message: err.message });
    //            }
    //            res.send({ token: validacao.createJWT(result) });
    //        });
    //    });
    //});

    app.post('/auth/unlink', validacao.ensureAuthenticated, function(req, res) {
        var provider = req.body.provider;
        var providers = ['facebook', 'foursquare', 'google', 'github', 'instagram',
            'linkedin', 'live', 'twitter', 'twitch', 'yahoo'];

        if (providers.indexOf(provider) === -1) {
            return res.status(400).send({ message: 'Unknown OAuth Provider' });
        }

        User.findById(req.user, function(err, user) {
            if (!user) {
                return res.status(400).send({ message: 'User Not Found' });
            }
            user[provider] = undefined;
            user.save(function() {
                res.status(200).end();
            });
        });
    });



};