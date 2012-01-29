var client = new require('mysql').createClient();
Dao = function(host,port,user,password,database) {
	client.host = host;
	client.port = port;
	client.user = user;
	client.password = password;
	client.database = database;
	this.User = {
create:function(user, callback){
	       client.query("insert into user(email,token) values('"+user.email+"','"+user.token+"')", function (err,info){
			       if (!err) {
			       client.query("select * from user where user_id = "+info.insertId, function selectCb(err, result, field) {
				       callback(err, result, field);
				       });
			       } else {
			       callback(err, info);
			       }
			       });
       },
get:function(user, callback) {
	    client.query("select * from user where user_id = "+user.user_id, function selectCb(err,result,field){
			    callback(err, result);
			    });
    },	
update:function(user, callback) {
	       client.query("update user set email='"+user.email+"' where user_id = "+user.user_id, function(err, info) {
			       if (!err) {
			       client.query("select * from user where user_id = "+user.user_id, function selectCb(err,result,field) {
				       callback(err,result);
				       });
			       } else {
			       callback(err, result);
			       }
			       });
       },
remove:function(user, callback) {
	       client.query("select * from user where user_id="+user.user_id,function(err, result, field) {
			       console.log(result);
			       if (result) {
			       if (!err){
			       obj = result[0];	
			       client.query("delete from user where user_id="+user.user_id, function selectCb(err,result,field) {
				       if (!err) {
				       callback(err,obj);
				       } else {
				       callback(err,obj);
				       }
				       });
			       } else {
			       callback(err,result);
			       }
			       } else {
			       callback(err,result);
			       }
			       });
       }
	} 
	this.Book = {
create:function(book, callback){
	       client.query("insert into book(isbn, title, author, edition) values('"+book.isbn+"','"+book.title+"','"+book.author+"','"+book.edition+"')", function selectCb(err,result,field){
			       if (!err) {
			       client.query("select * from book where isbn = "+book.isbn, function selectCb(err, result, field) {
				       callback(err, result, field);
				       });
			       } else {
			       callback(err, result);
			       }
			       });
       },
get:function(book, callback){
	    client.query("select * from book where book_id="+book_id, function(err,results,field){
			    callback(err,results);
			    });
    },
search:function(book, callback) {
	       delimiter = " where ";
	       where = "";
	       str = "";
	       for (var key in book){
		       if (key=="isbn"||key=="title"||key=="author"||key=="edition"){
			       if (typeof(book[key])=="string"){
				       str = "'"+book[key]+"'";
			       } else {
				       str = book[key];
			       }
			       where += delimiter + key+" = "+str;
			       delimiter = " and ";
		       }
	       } 
	       client.query("select * from book"+where, function selectCb(err,result,field){
			       callback(err, result);
			       });
       },	
update:function(user, callback) {
	       client.query("update book set isbn ="+book.isbn+",title = '"+book.title+"',author = '"+book.author+"',edition="+book.edition+" where user_id = "+user.user_id, function selectCb(err, result, field) {
			       callback(err, result);
			       });
       }
	}
	this.Request= {
create:function(request, callback){
	       client.query("insert into request(user_id, book_id, valid) values("+request.user_id+","+request.book_id+",true)", function selectCb(err,info){
			       if (!err) {
			       client.query("select * from request where request_id = "+info.insertId, function selectCb(err, result, field) {
				       callback(err, result);
				       });
			       } else {
			       callback(err, result);
			       }
			       });
       },
get:function(request,callback){
	    client.query("select * from request where request_id = "+request.request_id,function(err,results,field) {
			    callback(err,results)
			    });
    },
search:function(request, callback) {
	       delimiter = " where ";
	       where = "";
	       str = "";
	       for (var key in request){
		       if (key=="valid" || key == "book_id" || key == "user_id") {
			       str = request[key];
			       where += delimiter + key+" = "+str;
			       delimiter = " and ";
		       }
	       }
	       console.log(where);
	       client.query("select * from request"+where, function selectCb(err,result,field){
			       callback(err, result);
			       });
       },	
update:function(request, callback) {
	       client.query("update request set book_id = "+request.book_id+",valid="+request.valid+" where request_id = "+request.request_id, function selectCb(err, result, field) {
			       if (!err) {
			       client.query("select * from request where request_id="+request.request_id, function(err,result,fields){
				       callback(err,result);
				       });
			       } else {
			       callback(err, result);
			       }
			       });
       },
process:function(request, callback) {
		client.query("select * from offer where book_id in (select book_id from request where request_id="+request.request_id+")", function(err,result,fields) {
				callback(err,result);
				});
	}
	} 
	this.Offer= {
create:function(offer, callback){
	       client.query("insert into offer(user_id, book_id, valid) values("+offer.user_id+","+offer.book_id+",true)", function selectCb(err,info){
			       if (!err) {
			       client.query("select * from offer where offer_id= "+info.insertId, function selectCb(err, result, field) {
				       callback(err, result);
				       });
			       } else {
			       callback(err, result);
			       }
			       });
       },
get:function(offer,callback){
	    client.query("select * from offer where offer_id = "+offer.offer_id,function(err,results,field) {
			    callback(err,results)
			    });
    },
search:function(offer, callback) {
	       delimiter = " where ";
	       where = "";
	       for (var key in offer){
		       if (key=="valid" || key == "book_id" || key == "user_id") {
			       str = offer[key];
			       where += delimiter + key+" = "+str;
			       delimiter = " and ";
		       }
	       }
	       console.log(where);
	       client.query("select * from offer"+where, function selectCb(err,result,field){
			       callback(err, result);
			       });
       },	
update:function(offer, callback) {
	       client.query("update offer set book_id = "+offer.book_id+",valid="+offer.valid+" where offer_id= "+offer.offer_id, function selectCb(err, result, field) {
			       if (!err) {
			       client.query("select * from offer where offer_id="+offer.offer_id, function(err,result,fields){
				       callback(err,result);
				       });
			       } else {
			       callback(err, result);
			       }
			       });
       },
process:function(offer, callback) {
		client.query("select * from request where book_id in (select book_id from offer where offer_id = "+offer.offer_id+")", function(err,result,fields) {
				callback(err,result);
				});
	}
	} 

};
exports.Dao = Dao
