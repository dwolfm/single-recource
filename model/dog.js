'use strict';

var Sqlize = require('sequelize');
var sqlize = new Sqlize('cats_vs_dogs', 'kitty_dev', '1324', 
		{ dialect: 'postgres'});

var Dog = module.exports = sqlize.define('dog', {
	name: Sqlize.STRING,
	tail_length: Sqlize.STRING,
});

Dog.sync();
