/**
 * Server class where http server is created
 */
var fs = require('fs');
//requiring node modules and self-created modules
var express = require('express');
  //fs used for https
//var fs = require('fs');
var scraper = require('./scraper.js').Scrapers;
var Dao = require('./dao.js').Dao;
var dao = new Dao('localhost:27017/brobooks');
var Model = require('./model.js').model;
var Response = Model.Response;
var Router = require('./router.js').Router;
var router = new Router(scraper,dao);
var FB = require('./fb.js').FB;
//options if https is in use
/*var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};*/
//setting up express http server
var app = express();
var port = 80;
//setting up static routing
app.use(express.static('../public'));
app.listen(port);
console.log("Server listening on port "+port);
app.enable("jsonp callback");
//setting up REST API routing services
app.get('/api/service',function(req,res){
  start = new Date();
  //checking that service is formatted properly (name=object.method)
  if (req.query['name']) {
    var service = req.query['name'].split(".");
    if (service.length != 2) {
      //sends back failed response
      response = new Response("failure",1337,"service name improper",req.query,start,new Date(), null);
      res.json(response);
    } else {
      //routes service through router class where it returns the appropriate response
      router.route(service, req.query.params, function (r) {
          response = new Response(r.status,r.code,r.message,req.query,start,new Date(),r.result);
          res.json(response);
      });  
    }
  } else {
    //service error returned
    response = new Response("failure",1337,"no service name given",req.query,start,new Date(),null); 
    res.json(response);
  }  
});
