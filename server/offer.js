var Offer = require('./model.js').Offer;
var offer = function(dao){
  this.dao = dao;
  this.create = function(user, book, price, time, loc, condition, callback) {
    offer = new Offer(user, book, price, condition, time, loc, 1);  
    dao.offer.update(offer, callback);
  }
}
exports.Offer = offer;
