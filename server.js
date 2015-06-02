var mongoose = require('mongoose');
var express = require('express');
var app = express();

process.env.APP_SECRET = process.env.APP_SECRET || 'this are my test secrete';
mongoose.connect("mongodb://localhost/cats_dev");

var catRouter = express.Router();
require('./lib/catRoutes.js')(catRouter);
app.use('/api', catRouter);


function fourOhfour(req, res){
	res.status(404).msg({"msg": "fourOhfour"});
}

app.use(function(req, res, next){
	res.status(404).send('fourOhfour not found');	
	next();
});

app.listen( 3000, function(){
	console.log('starting the server');
});
