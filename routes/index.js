var express = require('express');
const { urlController } = require('../controllers/urlController');
var indexRouter = express.Router();


/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  if(!req.user){
  res.render('index');
  }else{
    res.redirect(303, '/shorten');
  }
});

indexRouter.get('/:id', urlController.getOriginalUrl);
module.exports = indexRouter;
