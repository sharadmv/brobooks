var express = require('express');
var app = express.createServer();
var http = require('http');
app.use(express.static('../static'));
var Dao =  new require('./dao.js').Dao;
var dao = new Dao("localhost",3306,"root","","brobooks");
var xml = require('xml2js');
var parser = new xml.Parser();
var port = 80;
app.use(express.static('../static'));
app.set('view engine', 'ejs');
app.set('views', '../views');
app.enable("jsonp callback");
//Classes
var Error = function(code, message){
				this.code = code;
				this.message = message;
}
app.get('/', function(req,res) {
								res.render('home.ejs',{page:'home'});
								});
//DAO Services
app.get('/api/user.create', function(req, res) {
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
app.get('/api/user.get', function(req, res) {
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
app.get('/api/user.update', function (req, res) {
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
app.get('/api/user.remove', function(req, res) {
								console.log('user.remove', req.params, req.query);
								if (req.query['user_id']) {
								dao.User.remove(req.query, function(error, result) {
												if (!error) {
												if (result) {
												res.json(result);
												} else {
												res.json(new Error(500, "User not found"));
												}
												} else {
												res.json(new Error(500, error.message));
												}
												});
								} else {
								res.json(new Error(400, "Parameters incorrect"));
								}
								});
app.get('/api/book.create', function (req, res) {
								console.log("book.create", req.params, req.query);
								if (req.query['isbn'],req.query['title'], req.query['author'], req.query['edition']){
								dao.Book.create(req.query, function(error, result){
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
app.get('/api/book.search', function(req,res) {
								console.log("book.search", req.params, req.query);
								dao.Book.search(req.query, function(error, result){ 
												if (!error) {
												res.json(result);
												} else {
												res.json(new Error(500, error.message));
												}
												});
								});
app.get('/api/request.create', function (req, res) {
								console.log("request.create", req.params, req.query);
								if (req.query['book_id'] && req.query['user_id']) {
								dao.Request.create(req.query, function (error, result) {
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
app.get('/api/request.get', function(req,res) {
								console.log("request.get", req.params, req.query);
								if (req.query['request_id']){
								dao.Request.get(req.query, function (error,result) {
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
app.get('/api/request.search', function(req,res) {
								console.log("request.search", req.params, req.query);
								dao.Request.search(req.query, function(error,result) {
												if (!error) {
												res.json(result);
												} else {
												res.json(new Error(500,error.message));
												}
												});
								});
app.get('/api/request.update', function(req,res) {
								console.log("request.update", req.params, req.query);
								if (req.query['book_id'] || req.query['valid']) {
								dao.Request.update(req.query, function(error,result) {
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
app.get('/api/request.process', function(req,res){ 
								console.log("request.process", req.params, req.query);
								if (req.query['request_id']){
								dao.Request.process(req.query, function(error,result){
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
app.get('/api/offer.create', function (req, res) {
								console.log("offer.create", req.params, req.query);
								if (req.query['book_id'] && req.query['user_id']) {
								dao.Offer.create(req.query, function (error, result) {
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
app.get('/api/offer.get', function(req,res) {
								console.log("offer.get", req.params, req.query);
								if (req.query['offer_id']){
								dao.Offer.get(req.query, function (error,result) {
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
app.get('/api/offer.search', function(req,res) {
								console.log("offer.search", req.params, req.query);
								dao.Offer.search(req.query, function(error,result) {
												if (!error) {
												res.json(result);
												} else {
												res.json(new Error(500,error.message));
												}
												});
								});
app.get('/api/offer.update', function(req,res) {
								console.log("offer.update", req.params, req.query);
								if (req.query['book_id'] || req.query['valid']) {
								dao.Offer.update(req.query, function(error,result) {
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
app.get('/api/offer.process', function(req,res){ 
								console.log("offer.process", req.params, req.query);
								if (req.query['offer_id']){
								dao.Offer.process(req.query, function(error,result){
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
//END DAO Services
app.get('/api/course', function(req,res){
								term = req.query['term'];
								year = req.query['year'];
								ccn = req.query['ccn'];
								data = "bookstore_id-1=554&term_id-1="+year+term+"&div-1=&crn-1="+ccn;
								post_options = {
host: post_domain,
port: post_port,
path: post_path,
method: 'POST',
headers: {
'Content-Type': 'application/x-www-form-urlencoded',
'Content-Length': data.length
}
};
post_req = http.request(post_options, function(re) {

				re.on('data',function(chunk){
								str+=chunk.toString('ascii');
								});
				re.on('end',function(){
								parser.parseString(str,function(err,data){
												}););
				});
});
post_req.write(data);
post_req.end();
});

});
app.get('/api/isbn', function(req,res) {
								var options = {
host: 'isbndb.com',
path: '/api/books.xml?access_key=LEIREUYB&index1=isbn&value1='+req.query['value']
};

http.get(options, function(r) {
				str = "";
				r.on('data', function(chunk){
								str += chunk;
								});
				r.on('end', function(){
								parser.parseString(str, function(err,data){
												obj = {isbn:((data.BookList.BookData)['@']).isbn,isbn13:((data.BookList.BookData)['@']).isbn13,title:data.BookList.BookData.Title,author:data.BookList.BookData.AuthorsText};
												res.send(obj);
												});
								});
				}).on('error', function(e) {
								console.log("Got error: " + e.message);
								});
});
app.get('/*', function (req, res) {
					 console.log(req.params, req.query);
					 });
					 app.listen(port);
					 console.log("Server listening on port "+port);
