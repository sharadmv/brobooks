/**
 * Request encapsulation module
 */
var Request = require('./model.js').model.Request;
var FB = require('./fb.js').FB;
var util = require('./util.js').util;
var request = function(dao){
  this.dao = dao;
  this.get = function(obj, callback){
    dao.request.find(obj,function(message){
      if (message.code == 200){
        callback(message.result);
      } else {
        callback(message.message);
      }
    });
  }
  /*
   * This is where relationship mapping is performed and FB mutual friend sorting happens
   */
  this.find = function(obj, callback) {
    request = new Request(obj.user, obj.book, 1); 
    dao.offer.find({'user.fbId':{"$not":new RegExp(obj.user.fbId,'i')},'book.isbn':request.book.isbn,'state':1}, function(message) {
      var count = 0;
      if (message.result.length > 0 ){
        if (obj.user && message.result){
        for (var i = 0;i<message.result.length;i++){
          dao.user.find({fbId:message.result[i].user.fbId},i, function(user) {
          u = user.result[0];
          FB.mutual(obj.user, u, user.i, function(mutual,i){
            message.result[i].mutual = mutual.length;
            count++;
            if (count == message.result.length){
              message.result.sort(function(a,b){
                return b.mutual-a.mutual;
              });
              message.result.map(function(offer) {offer.user.token = null});
              callback(message.result);
            }
          });
          });
          }
        }
      } else {
        callback(message.result);
      }
    });
  }
  this.waitlist = function(obj, callback) {
    request = new Request(obj.user, obj.book, 1); 
    dao.request.update(request, function(message){
      callback(message.result);
    });
  }
  /**
   * Emails both users about the fulfillment
   */
  this.fulfill = function(obj, callback) {
    req = new Request(obj.user, obj.book, 0);
    obj.offer.state = 0;
    loc = obj.loc;
    off = obj.offer;
    time = obj.time;
    dao.request.update(request, function(message){
      dao.offer.update(off, function(message){
        util.mail([off.user.email,req.user.email],"BroBooks offer/request fulfilled!", "Greetings from BroBooks!\nI'm just confirming that the requester, "+req.user.name+", has responded to "+off.user.name+"'s offer for:\n\nBook: "+off.book.title+"\nPrice: "+off.price+"\nLocation: "+loc+"\nTime: "+time+"\n\nYour offers and requests have officially been removed from the listings and you will no longer be contacted about these ones.\n\nThank you for using BroBooks! We hope your transaction goes well! And may the odds ever be in your favor.\n\nSincerely,\nBrowl\n\nhttp://www.brobooks.com");  
        callback(message.result);
      });
    });
  }
}  
exports.Request = request;
