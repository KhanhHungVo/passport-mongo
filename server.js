var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var parser = bodyParser.urlencoded({extended:false});
var passport = require('passport');
var routes = require('./routes/index.js');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
var session = require('express-session');
var Account = require('./model/account.js');
var upload = require('./util/upload.js');
require('./config/passport.js')(passport);

app.set('view engine', 'jade');
app.set('views', './views');    
app.use(express.static('public'))
app.use(session({secret: 'asdjshakjdh^%', cookie:{maxAge: 600000}, resave: true, saveUninitialized: true}))
app.use(parser);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(upload);
mongoose.connect(configDB.url);
app.listen(process.env.PORT || 3000, () =>{
    console.log('server started');
})

app.use('/',require('./routes/index.js')(passport));

