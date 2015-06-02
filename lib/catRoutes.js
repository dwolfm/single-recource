'use strict';

var Cat = require('../model/cat.js');
var bodyParser = require('body-parser');

module.exports = function(router){
	router.use(bodyParser.json());
	
	router.get('/cat', function(req, res){
		Cat.find({}, function(err, data){
			if (err) {
				console.log(err);
				return res.status(666).json({msg: 'there waz a servr err'});
			}
			res.json(data);
		});
	});

	router.post('/cat', function(req, res){
		var newkitty = new Cat(req.body);
		newkitty.save(function(err, data){
			if (err) {
				console.log(err);
				return res.status(666).json({msg: 'srvr err wrigting dat json: ' + err.message});
			}
			res.json(data);
		});
	});

	router.put('/cat/:id', function(req, res){
		var updateKitty = req.body;
		console.log(updateKitty.name);
		delete updateKitty._id;
		Cat.update({'_id': req.params.id}, updateKitty, function(err, data){
			if (err) {
				console.log(err);
				return res.status(666).json({msg: 'ther dun be err updating that' + err.message});	
			}
			res.json(data);
		});
	});

	router.delete('/cat/:id', function(req, res){
		Cat.remove({'_id': req.params.id}, function(err, data){
			if (err){
				console.log(err);
				return res.status(666).json({msg: 'couldnt remove the cat :('});
			}
				res.json(data);
		});	
	});
};
