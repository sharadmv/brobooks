var Offer = require('./model.js').model.Offer;
var offer = function(dao){
  this.dao = dao;
  this.create = function(obj, callback) {
    offer = new Offer(obj.user, obj.book, obj.price, obj.condition, obj.time, obj.loc, 1);  
    dao.offer.update(offer, function(msg){
      callback(msg.result)
    });
  }
  this.fulfill = function(obj, callback) {
    //email stuff here
  }
}
exports.Offer = offer;
