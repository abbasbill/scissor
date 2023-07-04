var express = require('express');
const { urlController } = require('../controllers/urlController');
var indexRouter = express.Router();


/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.render('index');
});

indexRouter.get('/:shortenedUrl', urlController.getOriginalUrl);

module.exports = indexRouter;
