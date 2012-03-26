var express = require('express');
var fs = require('fs');
var scraper = require('./scraper.js').Scrapers;
var Dao = require('./dao.js').Dao;
var dao = new Dao('localhost:27017/brobooks');
console.log(dao);
var Model = require('./model.js').model;
var Response = Model.Response;
var Router = require('./router.js').Router;
var router = new Router(scraper,dao);
var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
var app = express.createServer(options);
var port = 80;
var FB = require('./fb.js').FB;
app.use(express.static('../public/static'));
app.listen(443);
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
app.get('/api/service',function(req,res){
  start = new Date();
  //checking that service is formatted properly
  if (req.query['name']) {
    var service = req.query['name'].split(".");
    if (service.length != 2) {
      response = new Response("failure",1337,"service name improper",req.query,start,new Date(), null);
      res.json(response);
    } else {
      router.route(service, req.query.params, function (r) {
          response = new Response(r.status,r.code,r.message,req.query,start,new Date(),r.result);
          res.json(response);
      });  
    }
  } else {
    response = new Response("failure",1337,"no service name given",req.query,start,new Date(),null); 
    res.json(response);
  }  
});
