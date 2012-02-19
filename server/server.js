var express = require('express');
var app = express.createServer();
var port = 80;
app.use(express.static('../static'));
app.listen(80);
app.set('view engine', 'ejs');
app.set('views','../views');
app.get('/', function(req,res) {
  res.render('home',{page:'home'});
});
app.get('/buy', function(req,res){
  res.render('buy',{page:'buy'});
});
app.get('/sell', function(req,res){
  res.render('sell',{page:'sell'});
});
