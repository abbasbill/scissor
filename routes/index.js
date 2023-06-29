var express = require('express');
var indexRouter = express.Router();


/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  if(!req.user){
  res.render('index');
  }else{
    res.redirect(303, '/shorten');
  }
});
module.exports = indexRouter;
