'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var log = console.log;
var sa = require('superagent');
chai.use(chaihttp);

describe('catRoutes.js', function(){
	describe('/cat', function(){
		var cat_id = null;

		describe('GET', function(){
			it('should return an array of cat objects', function(done){
				chai.request('localhost:3000')
					.get('/api/cat')
					.end(function(err, res){
						if (err) throw err;
						expect(Array.isArray(res.body)).to.eql(true);
						done();
					});
			});
		});

		describe('POST', function(){
			it('it should return post obj', function(done){
				var cat_obj = {name: 'lololo', age: 300};
				chai.request('localhost:3000')
					.post('/api/cat')
					.send(cat_obj)
					.end(function(err, res){
						if (err) throw err;
						cat_id = res.body._id;
						expect(res.body.name).to.eql(cat_obj.name);
						done();
					});
			});
		});
		
		describe('PUT', function(){
			it('should return ok 1', function(done){
				chai.request('localhost:3000')
					.put('/api/cat/' + cat_id)
					.send({name: "wat"})
					.end(function(err, res){
						if (err) throw err;
						expect(res.body.ok).to.eql(1);
						done();
					});
			});
		});

		describe('DELETE', function(){
			it('should return ok', function(done){
				chai.request('localhost:3000')
					.del('/api/cat/' + cat_id)
					.end(function(err, res){
						if (err) throw err;
						expect(res.body.ok).to.eql(1);
						done();
					});
			});
		});

	});
});
