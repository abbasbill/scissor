var express = require('express');
var indexRouter = express.Router();


/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.render('index');
});
module.exports = indexRouter;
