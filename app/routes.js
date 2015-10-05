module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular
	app.get('*', function(req, res) {
		res.sendFile(app.get('dir_public'), './public/index.html');
	});
};