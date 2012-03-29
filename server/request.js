var Request = require('./model.js').model.Request;
var FB = require('./fb.js').FB;
var util = require('./util.js').util;
var request = function(dao){
  this.dao = dao;
  this.find = function(obj, callback) {
    request = new Request(obj.user, obj.book, 1); 
    dao.offer.find({'user.fbId':{"$not":new RegExp(obj.user.fbId,'i')},'book.isbn':request.book.isbn,'state':1}, function(message) {
      var count = 0;
      if (message.result.length > 0 ){
        if (obj.user && message.result){
        for (var i = 0;i<message.result.length;i++){
          var j = i;
          FB.mutual(obj.user, message.result[i].user,i, function(mutual,i){
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
  this.fulfill = function(obj, callback) {
    req = new Request(obj.user, obj.book, 0);
    obj.offer.state = 0;
    loc = obj.loc;
    off = obj.offer;
    time = obj.time;
    dao.request.update(request, function(message){
      dao.offer.update(off, function(message){
      util.mail([off.user.email,req.user.email],"BroBooks offer/request fulfilled!", "Your offers and requests have been fulfilled!","Greetings from BroBooks.\nThis email is confirming that the requester, "+req.user.name+", has responded to "+off.user.name+"'s offer for:\n\nBook: "+off.book.name+"\nPrice: "+off.price+"\nLocation: "+loc+"\nTime: "+time+"\n\nYour offers and requests have officially been removed from the listings and you will no longer be contacted about these ones.\n\nThank you for using BroBooks!\n\nSincerely,\nBrowl");  
      callback(message.result);
      });
    });
  }
}  
exports.Request = request;
