var express = require('express');
var app = express.createServer();
app.use(express.static('../static'));
var dao = require('./dao.js')("localhost:3306","root");
var port = 80;
app.use(express.static('../static'));
app.get('/user.create', function(req, res) {
  newUser = new User(req.query['email'],req.query['token']);
});
app.listen(port);
console.log("Server listening on port "+port);
