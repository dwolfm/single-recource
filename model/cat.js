'use strict';

var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
	name: String,
	age: Number,
	origin: String,
	powers: {
		mental: [],
		physical: []
	},
	isEvil: Boolean
});

catSchema.path('name').required(true, "ouch: you cats have to have names yaknow");

module.exports = mongoose.model('Cat', catSchema);
