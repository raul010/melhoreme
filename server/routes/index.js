var ajax = require('../util/ajax')

module.exports = function(app, fn) {

	console.log('raul');
	require('./user')(app);
	require('./user-account')(app);

	// frontend routes =========================================================
	// route to handle all angular

	// To rewrite links, due to the html5Mode angular
	// Certificate if is this patterns /(^\/value1$)|(^\/value2$)/


	/*
		Muito cuidado com essa area, nao repetir, ou deixar de atualizar a lista abaixo.
		Cuidado com o regex, qualquer espaco, caracter ou a falta deles, gera problemas.
		---------------------------------------------------------------------------

	 	POR ORDEM ALFABETICA

		/
	 	/admin
	 	/content
	 	/dashboard
	 	/forgot
	 	/watch

	 */

	var urlMatches =
			/(^\/$)|(^\/admin$)|(^\/content$)|(^\/dashboard$)|(^\/forgot$)|(^\/watch)/;

	app.get('*', function(req, res) {
		if(urlMatches.exec(req.originalUrl)) {
			console.log('urlMatches -->', req.originalUrl);
			res.sendFile('index.html', { root: app.get('dir_client') });
			return;
		}

		console.log('!urlMatches -->', req.originalUrl);
		res.status(404);
		res.sendFile('erro.html', { root: app.get('dir_client') });

	});

};