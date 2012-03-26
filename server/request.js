var Request = require('./model.js').model.Request;
var request = function(dao){
  this.dao = dao;
  this.create = function(obj, callback) {
    request = new Request(obj.user, obj.book, 1); 
    dao.request.update(request, function(msg){
      dao.offer.find({book:{isbn:request.book.isbn}}, function(message) {
        callback(message.result);
      });
    });
  }
  this.fulfill = function(obj, callback) {
    req = obj.request;
  }
}  
exports.Request = request;
