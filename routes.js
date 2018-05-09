'use strict';

var mongoose = require('mongoose');
var config = require('./config');
//var jwt = require('express-jwt');
// var auth  = jwt({ secret : config.secret , userProperty: 'payload'});
// var passport = require('./passport');
var release    = require('./service/release');
var asset    = require('./service/assets');
var user     = require('./server/service/users');

module.exports = function(app , passport)
{
    app.post('/release/', release.create);
    app.get('/release/', release.read);
    app.get('/release/:id', release.single);
    app.put('/release/:id', release.update);
    app.put('/releastatus/:id', release.statusUpdate);

    app.put('/artwork/:id', release.artwork);

    app.post('/asset', asset.create);
    app.get('/asset/:id', asset.single);
    app.put('/asset/:id', asset.update);
    app.get('/asset/edit/:id', asset.single_asset);

    app.put('/assets/:id', release.assets_upload);
    // app.get('/notifications', rent_out.not_read);
    // app.put('/notifications/:id', rent_out.not_put);
    // app.post('/rent_out' ,  rent_out.create);
    // app.get('/rent_out',  rent_out.read);
    
    app.post('/session/create' ,  user.create);
    app.post('/login' ,  user.login);
    app.put('/coverage', auth , user.coverage);
    app.get('/settings', auth , user.readProfile);
    
    app.get('/auth/facebook' , passport.authenticate('facebook'));
    app.get('/auth/facebook/callback' , passport.authenticate('facebook',{
        successRedirect : '/release',
        failureRedirect  : '/'
    }));
    app.get('/auth/twitter' , passport.authenticate('twitter'));
    app.get('/auth/twitter/callback' , passport.authenticate('twitter',{
    	successRedirect : '/release',
    	failureRedirect  : '/'
    }));

};
