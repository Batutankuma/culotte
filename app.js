var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var {PrismaClient} = require('@prisma/client');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fileRouter = require('./routes/upload');

var app = express();

//isconnecting
async function isConnecting(){
  try {
    let Prisma = new PrismaClient();
    await Prisma.$connect();
    console.log('connecting');
  } catch (error) {
    console.error(error);
  }
}

isConnecting()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'storage')));
app.use(express.static(path.join(__dirname, 'public')));



app.use('/api',indexRouter, usersRouter,fileRouter);

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
