'use strict';

var Basic = require('passport-http').BasicStrategy;
var User = require('../model/user.js');

module.exports = function(passport){
	passport.use('basic', new Basic({}, function(email, password, done) {
		User.findOne({'basic.email': email}, function(err, user) {
			if (err) {
				console.log(err);
				return done('database err');
			}
			if (!user) {
				console.log('no user found');
				return done('no such user');
			}
			if(!user.checkPassword(password)) {
				console.log('checkPassword fail');
				return done('wrong password');
			}
			return done(null, user);
		});
	}));
};
