var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet'); // security
var rateLimit = require("express-rate-limit");
var bodyParser = require('body-parser');
var passport = require('passport');  // authentication

require('dotenv').config();

var {userModel} = require('./models');

var session = require('express-session');  //session middleware

var app = express();

var limiter = rateLimit({
	windowMs: 0.5 * 60 * 1000, // 30 seconds
	max: 50, // Limit each IP to 50 requests per `window` (here, per 30 seconds)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

var indexRouter = require('./routes/index.js');
var authRouter = require('./routes/auth.js');
var urlRouter = require('./routes/url.js');
var docsRouter = require('./routes/docs.js');

app.use(express.urlencoded({ extended: false }));


//add secuirty
app.use(helmet())

// Apply the rate limiting middleware to all requests
app.use(limiter)


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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api/shorten', urlRouter) 
app.use('/api/docs', docsRouter)        



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