var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var beersRouter = require('./routes/beers');
var breweriesRouter = require('./routes/breweries');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('*', cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));

app.use('/', indexRouter); // http://localhost:5000/
app.use('/auth', authRouter); // http://localhost:5000/auth
app.use('/users', usersRouter); // http://localhost:5000/users
app.use('/beers', beersRouter); // http://localhost:5000/beers
app.use('/breweries', breweriesRouter); // http://localhost:5000/breweries

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

const uri = process.env.ATLAS_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

module.exports = app;
