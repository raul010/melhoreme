module.exports = function(app) {
var DIR_PUBLIC = app.get('dir_public');
	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular
	app.get('*', function(req, res) {
		res.render(DIR_PUBLIC + '/index', {env: app.get('env')});
	});

	app.get('/video', function(req, res) {
		res.render(DIR_PUBLIC + '/views/video.html');
	});
};