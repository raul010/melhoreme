var User		= require('../models/User.js');
var jwt     	= require("jsonwebtoken");

module.exports = function(app, passport) {

require('../config/passport')(passport);

var DIR_CLIENT = app.get('dir_client');
var JWT_SECRET = app.get('jwt_secret');
	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// To rewrite links, due to the html5Mode angular

	//app.all('*', function(req, res) {
	//	console.log('SERVER ==> /*');
	//	res.sendFile('index.html', { root: DIR_CLIENT });
	//});

	// frontend routes =========================================================
	// route to handle all angular

	//app.get('*', function(req, res) {
	//	//res.sendFile(DIR_CLIENT + '/index');
	//});

	app.post('/signup', function(req, res) {

		// TODO[RAUL]: add SERVER SIDE VALIDATION


		console.log('SERVER ==> /signup');

		User.findOne({email: req.body.email}, function(err, user) {
			if (err) {
				// TODO[RAUL]: send AUTO EMAIL to admin, if reached this point
				res.json({
					type: false,
					dataServer: "Error occured: " + err
				});
			} else {
				if (user) {
					res.json({
						type: false,
						dataServer: "Usuário já registrado!"
					});
				} else {
					var userModel = new User();
					userModel.email = req.body.email;
					userModel.password = req.body.password;
					userModel.save(function(err, user) {
						user.token = jwt.sign({email: user}, JWT_SECRET);

						user.save(function(err, user1) {

							if(err) {
								// TODO[RAUL]: send AUTO EMAIL to admin, if reached this point
								throw err;

							} else {

								res.json({
									type: true,
									dataServer: {
										email: user1.email
									},
									token: user.token
								});
							}
						});
					})
				}
			}
		});
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
					user.comparePassword(req.body.password, function(err, isMatch) {
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

	// =====================================
	// FACEBOOK ROUTES =====================
	// =====================================
	// route for facebook authentication and login
	//app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'} ));
	app.post('/auth/facebook', passport.authenticate('facebook', { scope: 'email'} ));

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
			passport.authenticate('facebook', {
				//successRedirect : '/profile',
				failureRedirect : '/'
			}), function (req, res	) {
				// Successful authentication, redirect home.
				//res.json({
				//	type: true,
				//	//data: user
				//});

			}

	);
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

};