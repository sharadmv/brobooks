var isDevMode = process.argv[2] === "dev";

var express = require('express');
var Dao = require('./dao.js').Dao;
var Model = require('./model.js').model;
var OfferService = require('./offerService.js').OfferService;
var UserService = require('./userService.js').UserService;
var FillService = require('./fillService.js').FillService;
var Util = require('./util.js').util;

var fbKey = isDevMode ? "356895117719349" : "305320992851654";
var dao = new Dao();
var offerService = new OfferService(dao, {});
var userService = new UserService(dao);
var fillService = new FillService(dao, userService, offerService);

var app = express.createServer();
var port = 80;

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
      offers: offers,
      fbKey: fbKey
    });
  })
});

app.get('/buy', function (req, res) {
  var offerId = req.query.offerId;
  offerService.getOffer({ offerId: offerId }, function (err, offer) {
    if (err) renderErr(err, res);

    res.render('buy', {
      page: 'buy',
      offer: offer,
      fbKey: fbKey,
    });
  });
});

app.get('/sell', function (req, res) {
  Util.depts(function (err, depts) {
    if (err) renderErr(err, res);

    res.render('sell', {
      page: 'sell',
      depts: depts,
      fbKey: fbKey
    });
  });
});

app.get('/offer/create', function (req, res) {
  offerService.create(req.query, function (err, offer) {
    if (err) renderErr(err, res);

    offerService.getByUser(req.query, function (err, offers) {
      res.render('offers', {
        page: 'offers',
        offers: offers,
        fbKey: fbKey
      });
    });
  });
});

app.get('/offers', function (req, res) {
  offerService.getByUser(req.query, function (err, offers) {
    res.render('offers', {
      page: 'offers',
      offers: offers,
      fbKey: fbKey
    });
  });
});

app.get('/offersSplash', function (req, res) {
  res.render('offersSplash', {
    page: 'offersSplash',
    fbKey: fbKey
  });
});

app.get('/offer/delete', function (req, res) {
  offerService.delete(req.query, function (err, offer) {
    offerService.getByUser(req.query, function (err, offers) {
      res.render('offers', {
        page: 'offers',
        offers: offers,
        fbKey: fbKey
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
        depts: depts,
        fbKey: fbKey
      });

    })
  });
});

app.get('/offer/update', function (req, res) {
  offerService.update(req.query, function (err, offer) {
    offerService.getByUser(req.query, function (err, offers) {
      res.render('offers', {
        page: 'offers',
        offers: offers,
        fbKey: fbKey
      });
    });
  });
});



app.get('/fill/create', function (req, res) {
  fillService.create(req.query, function (err, fill) {
    if (err) renderErr(err, res);

    res.render('fill', {
      page: 'fill',
        fbKey: fbKey
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
    page: 'about',
    fbKey: fbKey
  });
});

function renderErr (err, res) {
  console.error(err);
  res.render('error', {
    page: 'error',
    fbKey: fbKey
  });
};

