var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');  // authentication

require('dotenv').config();

const {userModel} = require('./models');

const session = require('express-session');  //session middleware

var app = express();

var indexRouter = require('./routes/index.js');
var authRouter = require('./routes/auth.js');
var urlRouter = require('./routes/url.js');
var titlyRouter = require('./routes/titly.js');
const {titlyController} = require('./controllers/titlyController');


app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

app.use(passport.initialize()); // initialize passport middleware
app.use(passport.session()); // use passport session middleware

// passport.use(userModel.createStrategy()); // use the user model to create the strategy
passport.use(userModel.createStrategy());
// serialize and deserialize the user object to and from the session
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/shorten', urlRouter)     
app.use('/:id', titlyController.getOriginalUrl)      

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;