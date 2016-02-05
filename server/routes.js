module.exports = function(app) {
var DIR_CLIENT = app.get('dir_client');
	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular
	app.get('*', function(req, res) {
		//console.log("opaaa****");
		//res.sendFile(DIR_CLIENT + '/index');
	});

	//app.get('/content', function(req, res) {
    //
	//	console.log("content****");
	//	res.sendFile(DIR_CLIENT + '/views/content');
	//});
};