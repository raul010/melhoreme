module.exports = function(app) {
var DIR_CLIENT = app.get('dir_client');
	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// To rewrite links, due to the html5Mode angular

	app.get('*', function(req, res) {
		console.log('SERVER ==> /*');
		res.sendFile('index.html', { root: DIR_CLIENT });
	});

	// frontend routes =========================================================
	// route to handle all angular

	//app.get('*', function(req, res) {
	//	//res.sendFile(DIR_CLIENT + '/index');
	//});

	app.post('/cadastro-email', function(req, res) {

		console.log('SERVER ==> /cadastro-email ');

		res.sendFile('index.html', { root: DIR_CLIENT });
	});
};