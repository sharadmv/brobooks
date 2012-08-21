/**
 * Offer encapsulation model
 */
var Offer = require('./model.js').model.Offer;
var Util = require('./util.js').util;
var OfferService = function (dao, waitlist){
  this.dao = dao;

  this.create = function (obj, callback) {
    if (!Util.hasParams(obj, ['userId', 'dept', 'course', 'title', 'price', 'loc', 'time', 'author', 'edition',
          'fulfilled', 'condition'])){
      callback("offer.create function missing param");
      return;
    };
    var offer = new Offer(obj.userId, obj.dept, obj.course, obj.title, obj.price,
      obj.loc, obj.time, obj.contact, obj.author, obj.edition, obj.fulfilled, obj.condition, obj.isbn);
    dao.offer.create(offer, callback);
  };

  this.getOffer = function (obj, callback) {
    dao.offer.getOffer(obj.offerId, callback);
  };

  this.update = function (obj, callback) {
    if (!Util.hasParams(obj, ['userId', 'dept', 'course', 'title', 'price', 'loc', 'time', 'author', 'edition',
          'fulfilled', 'condition'])){
      callback("offer.update function missing param");
      return;
    };
    var offer = new Offer(obj.userId, obj.dept, obj.course, obj.title, obj.price,
      obj.loc, obj.time, obj.contact, obj.author, obj.edition, obj.fulfilled, obj.condition, obj.isbn);
    offer.offerId = obj.offerId;
    dao.offer.update(offer, callback);
  };

  this.delete = function (obj, callback) {
    dao.offer.delete(obj.offerId, callback);
  };

  this.fill = function (obj, callback) {
    dao.offer.fill(obj.offerId, callback);
  };

  this.getAll = function (obj, callback) {
    dao.offer.getAll(callback);
  };

  this.getByUser = function (obj, callback) {
    dao.offer.getByUser(obj.userId, callback);
  };
}
exports.OfferService = OfferService;
