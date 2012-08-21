var Fill = require('./model.js').model.Fill;
var Util = require('./util.js').util;

var FillService = function (dao, userService, offerService) {
  this.dao = dao;
  this.userService = userService;
  this.offerService = offerService

  this.create = function (obj, callback) {
    if (!Util.hasParams(obj, ['userId', 'offerId', 'loc', 'time'])) {
      callback("fill.create function missing param");
      return;
    };
    var fill = new Fill(obj.userId, obj.offerId, obj.loc, obj.time, obj.contact);
    dao.fill.create(fill, function (err, result) {
      userService.getUser({ userId: result.userId }, function (err, buyer) {
        offerService.getOffer({ offerId: fill.offerId }, function (err, offer) {
          userService.getUser({ userId: offer.userId }, function (err, seller) {
            var buyerFirstName = buyer.name.split(" ")[0];

            var message = "Hello " + seller.name.split(" ")[0] + ",\n\n";
            message += buyerFirstName + " would like to buy your book called " + offer.title + " for $" +
              offer.price + " at location " + fill.loc + " at " + fill.time + " time.\n\n";
            message += buyerFirstName + " has been cc'd to this email.";
            if (offer.contact) {
              message += "You have listed that the best way to reach you is " + offer.contact; +
                ". If this is no longer the best way to contact you, please let the buyer know.";
            }
            if (fill.contact) {
              message += buyerFirstName + " stated that he would prefer being contacted via " + fill.contact + ".";
            }
            message += "\n\n";
            message += "Have a great day!\n" +
              "Gerald";
            Util.mail(seller.email, buyer.email, buyerFirstName + " Wants Your Book!", message);
            offerService.fill(offer, function (err, offer) {
              callback(false, fill);
            });
          });
        });
      });
    });
  };

  this.getFill = function (obj, callback) {
    if (!Util.hasParams(obj, ['fillId'])) {
      callback("FillService.getFill is missing fillid");
      return;
    }
    dao.fill.getFill(obj.fillId, callback);
  };
};

exports.FillService = FillService;
