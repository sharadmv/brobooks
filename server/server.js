var express = require('express');
var app = express.createServer();
var dao = require('./dao.js');
var user = function(email, token) {
  this.email = email;
  this.token = token;
  this.create = function(){
    
  }
}
app.use(express.static('../static'));
app.get('/user.create', function(req, res) {
  newUser = new User(req.query['email'],req.query['token']);
});
app.listen(3000);
