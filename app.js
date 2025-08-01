var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// MongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/fryserdb').then(
	console.log("Connected")
);


var indexRouter = require('./routes/index');
var settingsRouter = require('./routes/settings');
var fryserRouter = require('./routes/fryser');
var varslingRouter = require('./routes/varslinger')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/css", express.static("./node_modules/bootstrap/dist/css"));



app.use('/', indexRouter);
app.use('/settings', settingsRouter);
app.use('/fryser', fryserRouter);
app.use('/varslinger', varslingRouter);

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
