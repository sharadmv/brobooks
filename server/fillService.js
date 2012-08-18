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
    var fill = new Fill(obj.userId, obj.offerId, obj.loc, obj.time);
    dao.fill.create(fill, function (err, fill) {
      console.log("HI");
      console.log(fill);
      userService.getUser({ userId: fill.userId }, function (err, buyer) {
        offerService.getOffer({ offerId: fill.offerId }, function (err, offer) {
          userService.getUser({ userId: offer.userId }, function (err, seller) {
            console.log("Offer", offer);
            console.log("Buyer", buyer);
            console.log("Seller", seller);
            var buyerFirstName = buyer.name.split(" ")[0];

            var message = "Hello " + seller.name.split(" ")[0] + ",\n\n" +
              buyerFirstName + " would like to buy your book called " + offer.title + " for $" +
              offer.price + " at location " + fill.loc + " at " + fill.time + " time.\n\n" +

              buyerFirstName + " has been cc'd to this email.\n\n" +
              "Have a great day!\n" +
              "Browl";
            Util.mail(seller.email, buyer.email, buyerFirstName + " Wants Your Book!", message);
            offerService.fill(offer, callback);
          });
        });
      });
    });
  };

  this.getFill = function (obj, callback) {
    dao.fill.getFill(obj.fillId, function (fill) {
      callback(fill);
    });
  };
};

exports.FillService = FillService;
