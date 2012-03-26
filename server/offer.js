var Offer = require('./model.js').model.Offer;
var offer = function(dao){
  this.dao = dao;
  this.create = function(obj, callback) {
    console.log(dao);
    offer = new Offer(obj.user, obj.book, obj.price, obj.condition, obj.time, obj.loc, 1);  
    dao.offer.update(offer, function(msg){
      callback(msg.result)
    });
  }
}
exports.Offer = offer;
