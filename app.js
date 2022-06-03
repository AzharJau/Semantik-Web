var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// router variables
var indexRouter = require('./routes/index');
var gameListingsRouter = require('./routes/game_listings');
var actionGameRouter = require('./routes/action_game');
var strategyGameRouter = require('./routes/strategy_game');
var valveGameRouter = require('./routes/valve_game');
var freeGameRouter = require('./routes/free_game');
var newGameRouter = require('./routes/new_game');
var goodratingGameRouter = require('./routes/goodrating_game');
var bypriceGameRouter = require('./routes/byprice_game');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRouter);
app.use('/game_listings', gameListingsRouter);
app.use('/action_game', actionGameRouter);
app.use('/strategy_game', strategyGameRouter);
app.use('/valve_game', valveGameRouter);
app.use('/free_game', freeGameRouter);
app.use('/new_game', newGameRouter);
app.use('/goodrating_game', goodratingGameRouter);
app.use('/byprice_game', bypriceGameRouter);

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
