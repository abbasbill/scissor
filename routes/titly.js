
var express = require('express');
var cacheMiddleware = require('../middleware/cache')
const {titlyController} = require('../controllers/titlyController');
// const connectEnsureLogin = require('connect-ensure-login'); //authorization middleware

var titlyRouter = express.Router();
// Route for generating short URLs
  // titlyRouter.get('/', cacheMiddleware, titlyController.getOriginalUrl)
  titlyRouter.get('/', titlyController.getOriginalUrl)


module.exports = titlyRouter;
