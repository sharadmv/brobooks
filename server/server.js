var express = require('express');
var app = express.createServer();
app.use(express.static('../static'));
var Dao =  new require('./dao.js').Dao;
var dao = new Dao("localhost",3306,"root","","brobooks");
var port = 8080;
app.use(express.static('../static'));
app.enable("jsonp callback");
//Classes
var Error = function(code, message){
	this.code = code;
	this.message = message;
}

app.get('/user.create', function(req, res) {
	console.log("user.create", req.params, req.query);
	if (req.query['email'] && req.query['token']){
		dao.User.create({email:req.query['email'],token:req.query['token']}, function(error, result) {
			if (!error) {
				res.json(result);
			} else {
				res.json(new Error(500, error.message));
			}
		});
	} else {
		res.json(new Error(400, "Parameters incorrect"));
	}
});
app.get('/user.get', function(req, res) {
	console.log("user.get", req.params, req.query);
	if (req.query['user_id'] || req.query['email'] || req.query['token']){
		dao.User.get(req.query, function(error, result) {
			if (!error) {
				res.json(result);	
			} else {
				res.json(new Error(500),error.message);
			}
		});
	} else {
		res.json(new Error(400, "Parameters incorrect"));
	}
});
app.get('/user.update', function (req, res) {
	console.log("user.update", req.params, req.query);
	if (req.query['user_id'] && req.query['email']) {
		dao.User.update(req.query, function(error, result) {
			if (!error) {
				res.json(result);
			} else {
				res.json(new Error(500, error.message));
			}
		});
	} else {
		res.json(new Error(400, "Parameters incorrect"));
	}
});
app.get('/*', function (req, res) {
	console.log(req.params, req.query);
});
app.listen(port);
console.log("Server listening on port "+port);
