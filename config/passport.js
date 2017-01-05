
var LocalStrategy = require('passport-local').Strategy;
var Account = require('../model/account.js')
module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });


    passport.deserializeUser(function(id, done){
        Account.findById(id, function(err, user){
            done(err, user);
        })
    });

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
        },function(req, username, password, done ){
            //console.log(req.file)
           Account.findOne({ username: username}).then(function(user){
               if(user){
                   done(null, false, req.flash('signupMessage', 'This username is already taken'))
               } else {
                   var newAccount = new Account({
                       username: username,
                       password: Account.generateHash(password),
                       avatar: req.file?req.file.filename:""
                   })
                   newAccount.save().then(function(account){
                       done(null, account)
                   }).catch(function(err){
                       console.log(err)
                       done(null, false, req.flash('signupMessage', err.name + ':' + err.Message))
                   })
               }
           })
        }))
    
    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,         
        }, function(req, username, password, done){
            Account.findOne({ username: username}).then(function(user){
                if(!user){
                    done(null, false, req.flash('signinMessage','username does not exist'))
                } else if(user.validPassword){
                        done(null, user)
                } else {
                        done(null, false, req.flash('signinMessage', 'password is not correct'))
                }
                }).catch(function(err){
                    console.log(err)
                    done(null, false, req.flash('signinMessage', err.name + ':' + err.Message))
                })
        }))
}

