const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const users = require('./routes/user');
const courses = require('./routes/course');
const courses_user = require('./routes/registerCourse-User')
const chat = require('./routes/chat')
const app = express();
app.use(passport.initialize());
require('./passport')(passport); 
// db connect

mongoose.connect('mongodb://localhost:27017/courseManager',{useNewUrlParser: true}).then(db=>{
  console.log('mongo connected')
}).catch(error=>console.log(error)); 
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/api/users', users);
app.use('/api/users/courses', courses);
app.use('/api/users/courses-user', courses_user);
app.use('/api/users/chat', chat);
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