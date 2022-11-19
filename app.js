const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// 
const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');

// mongoDB connection
const dbURI = require('./config/keys').mongoURI;

// passport config
require('./config/passport')(passport);

const app = express();

const PORT = process.env.PORT || 3000;

// connect mongoose to db
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('mongoDB connected');
        app.listen(PORT, console.log(`Server started on ${PORT}`));
    })
    .catch(err => console.log(err))

// EJS view engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
// app.use(expressLayouts);

// static files
app.use(express.static('public'));

//bodyparser - get form data
app.use(express.urlencoded({ extended: false }));

// Express session midleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//  Connect flash
app.use(flash());

// my custom middleware with Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// Routes
app.use('/', indexRoute);
app.use('/users', usersRoute);

// app.listen(PORT, console.log(`Server started on ${PORT}`));