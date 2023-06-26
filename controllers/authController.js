const { userModel } = require('../models')
const passport = require('passport');


exports.authController = {
	signup: async (req, res) => {
		try {
			const user = req.body;
			const existingUser = await userModel.findOne({ username: user.username });
			if (existingUser) {
				return res.status(201).send("user already exist");
			}
			userModel.register(new userModel({ username: user.username }), user.password, (err, user) => {
				if (err) {
					console.log(err.message);
					res.status(400).send(err);
				} else {
					passport.authenticate('local')(req, res, () => {
					res.redirect(303, "/shorten");
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
			res.redirect(303, '/shorten');
		});
	},


	// handles the logout request
	logout: async (req, res, next) => {
		req.logout((err) => {
			if (err) {
				return next(err);
			}
			res.redirect(303, '/');
		});
	}

}