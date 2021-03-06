
require("dotenv").config();
require('./config/mongo')

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require("hbs");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const mongoose = require("mongoose");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');
var authRouter = require('./routes/auth');
var commentsRouter = require('./routes/comment');
var favoritesRouter = require('./routes/favorites');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, "views/partials")); 


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// INITIALIZE SESSION

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI}),
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 25 * 60 * 60 * 1000,
    }
  })
);


// FLASH MESSAGES
// enable "flash messaging" system
// flash relies on the express-session mechanism
app.use(flash());

app.use(require("./middlewares/exposeFlashMessage"));
app.use(require("./middlewares/exposeLoginStatus"));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/auth', authRouter);
app.use('/comments', commentsRouter)
app.use('/favorites', favoritesRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
