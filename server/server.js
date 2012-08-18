/**
 * Server class where http server is created
 */
var fs = require('fs');
var express = require('express');
var Dao = require('./dao.js').Dao;
var dao = new Dao();
var Model = require('./model.js').model;
var Response = Model.Response;
var FB = require('./fb.js').FB;
var OfferService = require('./offerService.js').OfferService;
var offerService = new OfferService(dao, {});

var UserService = require('./userService.js').UserService;
var userService = new UserService(dao);

var FillService = require('./fillService.js').FillService;
var fillService = new FillService(dao, userService, offerService);

var Util = require('./util.js').util;
//options if https is in use
/*var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};*/
//setting up express http server
var app = express.createServer();
var port = 80;
//setting up static routing
app.listen(port);
console.log("Server listening on port "+port);
app.enable("jsonp callback");


app.configure(function () {
  app.use(express.static('../public/'));
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
});

app.get('/', function (req, res) {
  offerService.getAll({}, function (err, offers) {
    if (err) renderErr(err, res);

    res.render('home', {
      page: 'home',
      offers: offers
    });
  })
});

app.get('/buy', function (req, res) {
  var offerId = req.query.offerId;
  offerService.getOffer({ offerId: offerId }, function (err, offer) {
    if (err) renderErr(err, res);

    res.render('buy', {
      page: 'buy',
      offer: offer
    });
  });
});

app.get('/sell', function (req, res) {
  Util.depts(function (err, depts) {
    if (err) renderErr(err, res);

    res.render('sell', {
      page: 'sell',
      depts: depts
    });
  });
});

app.get('/offer/create', function (req, res) {
  offerService.create(req.query, function (err, offer) {
    if (err) renderErr(err, res);

    offerService.getByUser(req.query, function (err, offers) {
      res.render('offers', {
        page: 'offers',
        offers: offers
      });
    });
  });
});

app.get('/offers', function (req, res) {
  offerService.getByUser(req.query, function (err, offers) {
    res.render('offers', {
      page: 'offers',
      offers: offers
    });
  });
});

app.get('/offersSplash', function (req, res) {
  res.render('offersSplash', {
    page: 'offersSplash'
  });
});

app.get('/offer/delete', function (req, res) {
  offerService.delete(req.query, function (err, offer) {
    offerService.getByUser(req.query, function (err, offers) {
      res.render('offers', {
        page: 'offers',
        offers: offers
      });
    });
  });
});


app.get('/offer/toUpdate', function (req, res) {
  offerService.getOffer(req.query, function (err, offer) {
    Util.depts(function (err, depts) {
      res.render('offerUpdate', {
        page: 'offerUpdate',
        offer: offer,
        depts: depts
      });

    })
  });
});

app.get('/offer/update', function (req, res) {
  offerService.update(req.query, function (err, offer) {
    offerService.getByUser(req.query, function (err, offers) {
      res.render('offers', {
        page: 'offers',
        offers: offers
      });
    });
  });
});



app.get('/fill/create', function (req, res) {
  fillService.create(req.query, function (err, fill) {
    if (err) renderErr(err, res);

    res.render('fill', {
      page: 'fill'
    });
  });
});

app.get('/user/save', function (req, res) {
  userService.save(req.query, function (err, user) {
    res.send(user);
  });
});

app.get('/about', function (req, res) {
  res.render('about', {
    page: 'about'
  });
});

function renderErr (err, res) {
  console.error(err);
  res.render('error', {
    page: 'error'
  });
};

/*
//setting up REST API routing services
app.get('/api/service',function (req,res){
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
*/
