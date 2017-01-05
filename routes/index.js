var express = require('express');
var passport = require('../config/passport');
var router = express.Router();



module.exports = function(passport,upload){
    router.get('/', function(req, res){
        res.render('home', {user:req.user});
    })

    router.get('/signup', function(req, res){
        res.render('signup', {message: req.flash('signupMessage')});
    })

    router.get('/signin', function(req, res){
        res.render('signin', {message: req.flash('signinMessage')})
    })

    router.get('/home', function(req, res){
        res.render('home', {user: req.user})
    })

    router.post('/signup', passport.authenticate('local-signup',{
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
    }))

    router.post('/signin', passport.authenticate('local-signin',{
        successRedirect: '/home',
        failureRedirect: '/signin',
        failureFlash: true
    }))
    
    router.get('/signout', function(req, res){
        req.logout();
        res.redirect('/')
    })
    
    router.get('/editProfile',function(req, res){
        
    })

    return router
}