var express = require('express');
var authRouter = express.Router();
var {authController} = require('../controllers/authController')


// renders the login page
authRouter.get('/login', (req, res) => {
  res.render('login');
});

// renders the signup page
authRouter.get('/signup', (req, res) => {
  res.render('signup');
});

/* GET users. */
authRouter.post('/signup', authController.signup)
authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.logout)

module.exports = authRouter;
