var Request = require('./model.js').Request;
var request = function(dao){
  this.dao = dao;
  this.create = function(user, book, callback) {
    request = new Request(user, book, 1); 
    dao.request.update(request, callback);
  }
}  
exports.Request = request;
