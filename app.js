const Application= require('./models/Application');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const jwtMiddleware = require('express-jwt');

//const Place = require('./models/Place')
const db = require('./config/database');
const secrets = require('./config/secrets');
db.connect();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var placesRouter = require('./routes/places');
var sessionsRouter = require('./routes/sessions');
var favoritesRouter = require('./routes/favoritePlaces');
var visitsRouter = require('./routes/visits');
var visitsPlaceRouter = require('./routes/visitsPlace');
var applicationRouter = require('./routes/applications');

const findAppBySecret = require('./middelwares/findAppBySecret');
const authApp = require('./middelwares/authApp')();
const findAppByApplicationId = require('./middelwares/findAppByApplicationId');
const allowCORs = require('./middelwares/allowCORs')();
var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(findAppBySecret);
app.use(findAppByApplicationId);
app.use(authApp.unless({method: 'OPTIONS'}));
app.use(allowCORs.unless({path: '/public'}));
app.use(
  jwtMiddleware({secret: secrets.jwtSecret})
     .unless({path: ['/sessions','/users'], method: ['GET','OPTIONS']})
)
app.use('/',indexRouter);
app.use('/users',usersRouter);
app.use('/places',placesRouter);
app.use('/sessions',sessionsRouter);
app.use('/favorites',favoritesRouter);
app.use('/visits',visitsRouter);
app.use('/places',visitsPlaceRouter );
app.use('/applications',applicationRouter);

//app.get('/demo',function(req,res){
  //Application.remove({}).then(r => res.json({}));
//})

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
  res.json(err);
});

module.exports = app;
