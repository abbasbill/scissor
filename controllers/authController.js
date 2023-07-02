const { userModel } = require('../models')
const passport = require('passport');
const httpStatus = require('http-status');


exports.authController = {
	// handles the signup request for new users
	signup: async (req, res) => {
		try {
			const user = req.body;
			const existingUser = await userModel.findOne({ username: user.username });
			if (existingUser) {
				return res.status(httpStatus.CONFLICT).send("user already exist");
			}
			userModel.register(new userModel({ username: user.username }), user.password, (err, user) => {
				if (err) {
					res.status(400).send(err);
				} else {
					passport.authenticate('local')(req, res, () => {
						// returns user object if req.header("content-type") === 'application/json'
						if (req.header("content-type") === 'application/json') {
							return res.status(httpStatus.CREATED).send({ user: user });
						}
						// redirects to the shorten page if req.header("content-type") !== 'application/json'
							res.redirect(303, "/api/shorten");
					})
				}
			})
		} catch (error) {
			// Handle any errors that occurred during the database operation
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},


	login: async (req, res) => {
		// handles the login request for existing users
		passport.authenticate('local')(req, res, () => {
				// returns user object if req.header("content-type") === 'application/json'
				if (req.header("content-type") === 'application/json') {
					return res.send({ user: req.user });
				}
				// redirects to the shorten page if req.header("content-type") !== 'application/json'
					res.redirect(303, '/api/shorten');
		});
	},


	// handles the logout request
	logout: async (req, res, next) => {
		req.logout((err) => {
			if (err) {
				return next(err);
			}
			// returns user object if req.header("content-type") === 'application/json'
			if (req.header("content-type") === 'application/json') {
				return res.send({ user: null });
			}
			res.redirect(303, '/');
		});
	}

}