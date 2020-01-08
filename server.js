require('./db');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


let postsController = require ('./controllers/posts');
let usersController = require ('./controllers/users');

let app = express();

//Passport config
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('views', path.join(__dirname, '/views/'));
app.set('view engine', 'pug');
//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
//Connect flash
app.use(flash());
app.use(bodyParser.json());

//Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})
app.listen(3000, function () {
        console.log('Api app started');
    });
app.use('/post', postsController);
app.use('/user', usersController);
