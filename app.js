require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport')
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);


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

// Global variables for app (<%=theme%> in ejs)
// app.use((req, res, next) => {
	// res.locals.themecolor = req.user.theme;
	// 	res.locals.user = req.user;
	// 	res.locals.baseUrl = process.env.BASE_URL;
	// next()
// });

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
//   cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  store: new SQLiteStore()
}));
app.use(passport.authenticate('session'));

app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth'));
app.use('/fryser', require('./routes/fryser'));
app.use('/settings', require('./routes/settings'));
app.use('/users', require('./routes/user.routes'));
app.use('/varslinger', require('./routes/varslinger'));

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
