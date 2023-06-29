var express = require('express');
const { titlyController } = require('../controllers/titlyController');
var indexRouter = express.Router();


/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.render('index');
});
indexRouter.get('/:id',  titlyController.getOriginalUrl);
module.exports = indexRouter;
