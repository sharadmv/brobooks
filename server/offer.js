var Offer = require('./model.js').model.Offer;
var util = require('./util.js').util;
var offer = function(dao, waitlist){
  this.dao = dao;
  this.waitlist = waitlist;
  this.get = function(obj, callback){
    dao.offer.find(obj, function(message) {
      if (message.code == 200){
        callback(message.result);
      } else {
        callback(message.message);
      }
    });
  }
  this.create = function(obj, callback) {
    offer = new Offer(obj.user, obj.book, obj.price, obj.condition, obj.time, obj.loc, 1);  
    var fulfill = this.fulfill;
    dao.offer.update(offer, function(msg){
      waitlist.get(offer.book, function(waitlist){
        if (waitlist.length != 0 && waitlist[0].waitlist.length != 0){
        } else {
          fulfill({user:waitlist[0].waitlist[0].user,book:waitlist[0].waitlist[0].book, offer:offer}, function(msg){
            waitlist.dequeue({book:offer.book,user:waitlist[0].waitlist[0].user});
            console.log(msg);
          });
        }
      });
      callback(msg.result)
    });
  }
  this.fulfill = function(obj, callback) {
    req = new Request(obj.user, obj.book, 0);
    obj.offer.state = 0;
    loc = obj.loc;
    off = obj.offer;
    time = obj.time;
    dao.offer.update(obj.offer, function(message){
      dao.offer.update(off, function(message){
      util.mail([off.user.email,req.user.email],"BroBooks offer/request fulfilled!", "Your offers and requests have been fulfilled!","Greetings from BroBooks.\nThis email is confirming that the requester, "+req.user.name+", has responded to "+off.user.name+"'s offer for:\n\nBook: "+off.book.name+"\nPrice: "+off.price+"\nLocation: "+loc.general+"\nTime: "+time+"\n\nYour offers and requests have officially been removed from the listings and you will no longer be contacted about these ones.\n\nThank you for using BroBooks!\n\nSincerely,\nBrowl");  
      callback(message.result);
      });
    });
  }
}
exports.Offer = offer;
