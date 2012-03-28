var Request = require('./model.js').model.Request;
var FB = require('./fb.js').FB;
var request = function(dao){
  this.dao = dao;
  this.create = function(obj, callback) {
    request = new Request(obj.user, obj.book, 1); 
    dao.request.update(request, function(msg){
      dao.offer.find({book:{isbn:request.book.isbn}}, function(message) {
        var count = 0;
        if (message.result.length > 0 ){
          for (var i = 0;i<message.result.length;i++){
            FB.mutual(obj.user, message.result[i].user, function(mutual){
              message.result[i].mutual = mutual.length;
              count++;
              if (count == message.result.length){
                message.result.sort(function(a,b){
                  return a.mutual-b.mutual;
                });
                callback(message.result);
              }
            });
          }
        } else {
          callback(message.result);
        }
      });
    });
  }
  this.fulfill = function(obj, callback) {
    req = obj.request;
    //email stuff here
  }
}  
exports.Request = request;
