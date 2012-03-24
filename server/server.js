var express = require('express');
var scraper = require('./scraper.js').Scrapers;
var app = express.createServer();
var port = 80;
app.use(express.static('../public/static'));
app.listen(80);
app.set('view engine', 'ejs');
app.set('views','../public/views');
app.enable("jsonp callback");
app.get('/', function(req,res) {
  res.render('home',{page:'home'});
});
app.get('/buy', function(req,res){
  res.render('buy',{page:'buy'});
});
app.get('/sell', function(req,res){
  res.render('sell',{page:'sell'});
});
app.get('/api/scraper.course', function(req,res) {
  scraper.course(req.query['year'],req.query['term'],req.query['dep'],req.query['num'],function(obj){
    res.json(obj);
  });
});
app.get('/api/scraper.book', function(req,res) {
  scraper.book(req.query['year'],req.query['term'],req.query['ccn'], function(books) {
    res.json(books);
  });
});
