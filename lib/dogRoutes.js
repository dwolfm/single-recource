'use strict';

var bodyparser = require('body-parser');
var Dog = require('../model/dog.js');
var Sqlize = require('sequelize');
var sqlize = new Sqlize('cats_vs_dogs', 'kitty_dev', '1234',
	{ dialect: 'postgres'});


module.exports = function(router) {
	router.use(bodyparser.json());
	
	router.post('/dog', function(req, res) {
		sqlize.sync()
		.then(function(){
			Dog.create(req.body)
				.then(function(data) {
					res.json(data);
				})
		})
		.error(function(err) {
			console.log(err);
			res.status(500).json({msg: 'internal server err'});
		});
	});
};
