var User					= require('../models/User.js');
var UserUpload 				= require('../models/UserUpload.js');
var label					= require('../config/util/label.js');

var util 					= require('util');

var jwt     				= require("jsonwebtoken");
var multipart 				= require('connect-multiparty');
var multipartMiddleware 	= multipart();

var async					= require ('async');
var validator 				= require('validator');
var _						= require('lodash');

module.exports = function(app, passport) {

//require('../config/passport')(passport);

var DIR_CLIENT = app.get('dir_client');
var JWT_SECRET = app.get('jwt_secret');

	app.post('/signup', function(req, res) {

		// TODO[RAUL]: add SERVER SIDE VALIDATION

		console.log('SERVER ==> /signup');
		console.log(req.body);

		var userForm = {
			email: 			req.body.email,
			senha: 			req.body.senha,
			confirmaSenha: 	req.body.confirmaSenha
		};


		async.waterfall([
			validacaoDoCadastro,
			verificaErrosReferenteAoUsuarioNoBD,
			criaUsuario,
			salvaUsuarioNoBD,
			geraESalvaTokenDeUsuario

		],
		// optional callback
		function(err, results){
			console.info('results - >', results)
			console.error('err', err);
		});

		function validacaoDoCadastro(callback) {

			var dadosValidados = utilValidacaoDeDados(
				[userForm.email, 'email'],
				[userForm.senha, 'senha'],
				[userForm.confirmaSenha, 'confirmaSenha']
			);
			var err = null;

			if (dadosValidados.isAllOk) {
				return callback(err);
			}

			err = dadosValidados.infos;

			utilEnviaDadosParaClienteViaAjax(false, err);
			callback(err);

		}

		function verificaErrosReferenteAoUsuarioNoBD(callback) {
			console.log("verificaErrosReferenteAoUsuarioNoBD");
			User.findOne({email: req.body.email}, function(err, user) {

				if (err) {
					// TODO[RAUL]: send AUTO EMAIL to admin, if reached this point
					utilEnviaDadosParaClienteViaAjax(false, "Error occured: " + err)
				}
				callback(err, user);
			});
		}

		function criaUsuario(user, callback) {
			console.log("criaUsuario");

			var userModel = {};
			var err = null;

			if (user) {
				err = "Usuário já registrado!";

				utilEnviaDadosParaClienteViaAjax(false, err);
				callback(err);

			} else {
				userModel = new User({
					email: 			userForm.email,
					senha: 			userForm.senha,
					confirmaSenha: 	userForm.confirmaSenha
				});
			}
			callback(err, userModel);
		}

		function salvaUsuarioNoBD(userModel, callback) {
			console.log("salvaUsuarioNoBD");

			userModel.save(function(err, user) {
				// TODO[RAUL]: send AUTO EMAIL to admin, if reached this point
				if (err) {
					return console.error(err);
				}
				callback(null, user)
			});

		}

		function geraESalvaTokenDeUsuario(user, callback) {
			console.log("geraESalvaTokenDeUsuario");

			// Gera com base no email - nao mandar o objeto inteiro ou dados sensiveis
			// como senha ou documento pessoal
			user.token = jwt.sign({email: user.email}, JWT_SECRET);

			user.save(function(err, user1) {

				if(err) {
					// TODO[RAUL]: send AUTO EMAIL to admin, if reached this point
					self.err = err;
					return console.error(err);

				} else {
					utilEnviaDadosParaClienteViaAjax(true, {email: user1.email}, user.token);
					callback(null, user);
				}
			});
		}

		function utilEnviaDadosParaClienteViaAjax(type, dataServer, token) {
			console.log("utilEnviaDadosParaClienteViaAjax");
			res.json({
				type: type,
				dataServer: dataServer,
				token: token
			});
		}

		/**
		 *
		 *  Facade: Retorna dados validados
		 *
		 * @param campo
		 * @param nomeDoCampo
		 * @returns {{isAllOk: boolean, isAllOkInfo: string, email: {label: string, test: boolean, info: null}, senha: {label: string, test: boolean, info: null}, fail: null}}
         */
		function utilValidacaoDeDados() {
			var dadosValidados = {
				isAllOk: false,
				infos: {}
			};
			var infos = dadosValidados.infos;
			var campos = Array.prototype.slice.call(arguments);;


			testaExistenciaEValidade(campos);

			/**
			 * @param campo
             * @param nomeDoCampo
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
			function validaCampo(campo, nomeDoCampo) {

				switch (nomeDoCampo) {
					case "email":
						return validator.isEmail(campo);
					case "senha":
						senhaCurrent = campo;
						return validator.isLength(campo, {min: 6, max: undefined});
					case "confirmaSenha":
						return validator.equals(campo, senhaCurrent);
				}
			}

			function inicializaInfos(nomeDoCampo) {
				if (!infos[nomeDoCampo]) {
					return infos[nomeDoCampo] = [];
				}
				return infos[nomeDoCampo];
			}

			dadosValidados.isAllOk = _.isEmpty(infos);

			return dadosValidados;
		}
	});

	app.post('/signin', function(req, res) {
		console.log('SERVER ==> /signin');

		User.findOne({email: req.body.email}, function(err, user) {
			if (err) {
				// TODO[RAUL]: send AUTO EMAIL to admin, if reached this point
				res.json({
					type: false,
					dataServer: "Error occured: " + err
				});
			} else {
				if (user) {
					user.comparePassword(req.body.senha, function(err, isMatch) {
						// TODO[RAUL]: send AUTO EMAIL to admin, if reached this point
						if (err) {
							res.json({
								type: false,
								dataServer: "Incorrect email/password"
							});
						} else {

							res.json({
								type: true,
								dataServer: {
									email: user.email
								},
								token: user.token
							});
						}
					});
				} else {
					// TODO[RAUL]: implement FORGOT PASSWORD feature
					res.json({
						type: false,
						dataServer: "Incorrect email/password"
					});
				}
			}
		});
	});

	app.get('/me', ensureAuthorized, function(req, res) {
		console.log('SERVER ==> /me');
		User.findOne({token: req.token}, function(err, user) {
			if (err) {
				res.json({
					type: false,
					data: "Error occured: " + err
				});
			} else {
				console.log('/me ===> ' + user);
				res.json({
					type: true,
					data: user
				});
			}
		});
	});

	function ensureAuthorized(req, res, next) {
		var bearerToken;
		var bearerHeader = req.headers["authorization"];
		if (typeof bearerHeader !== 'undefined') {
			var bearer = bearerHeader.split(" ");
			bearerToken = bearer[1];

			// verify a token symmetric
			jwt.verify(bearerToken, JWT_SECRET, function(err, decoded) {
				if(err) {
					// TODO[RAUL]: send AUTO EMAIL to admin, if reached this point
					res.sendStatus(403);
				}
				console.log(decoded); // bar
				req.token = decoded;
				next();
			});
		} else {
			// TODO[RAUL]: send AUTO EMAIL to admin, if reached this point
			res.sendStatus(403);
		}
	}


	// route for showing the profile page
	app.get('/profile', isLoggedIn, function(req, res) {
		console.log('/profile ==> isLoggedIn');
	});


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

	//Upload
	app.post('/api/user/uploads',
			multipartMiddleware,
			UserUpload.uploadFile);

	// frontend routes =========================================================
	// route to handle all angular

	// To rewrite links, due to the html5Mode angular
	app.all('*', function(req, res) {
		console.log('SERVER ==> *');
		res.sendFile('index.html', { root: DIR_CLIENT });
	});

};