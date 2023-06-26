
var express = require('express');
const {urlController} = require('../controllers/urlController');
const connectEnsureLogin = require('connect-ensure-login'); //authorization middleware

var urlRouter = express.Router();
// Route for generating short URLs
  urlRouter.get('/', connectEnsureLogin.ensureLoggedIn(), urlController.getShortUrl);
  urlRouter.post('/',  connectEnsureLogin.ensureLoggedIn(), urlController.createShortUrl);
  urlRouter.get('/:id', urlController.getShortUrlById)


module.exports = urlRouter;
