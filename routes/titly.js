
var express = require('express');
const {titlyController} = require('../controllers/titlyController');
// const connectEnsureLogin = require('connect-ensure-login'); //authorization middleware

var titlyRouter = express.Router();
// Route for generating short URLs
  titlyRouter.get('/', titlyController.getShortUrlById)


module.exports = titlyRouter;
