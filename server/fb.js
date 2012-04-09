/**
 * Facebook Module
 * @author Sharad Vikram
 */
var util = require('./util.js').util;
var FB = {
  /**
   * Grabs data about the given user
   */
  me:function(user, callback){
    util.get('graph.facebook.com','/me?access_token='+user.token,true,function(obj){
      obj = JSON.parse(obj);
      if (obj != null) {
      callback(obj.data);
      } else {
        callback({});
      }
    });
  },
  /*
   * Grabs all the given user's friends
   */
  friends:function(user, callback){
    util.get('graph.facebook.com','/me/friends?access_token='+user.token+'&limit=999999',true,function(obj){
      obj = JSON.parse(obj);
      if (obj != null) {
        callback(obj.data);
      } else {
        callback([]);
      }
    });
  },
  /** Grabs mutual friend data for two users */
  mutual:function(u1, u2,i, callback) {
    var complete = false;
    var a1, a2;
    FB.friends(u1, function(obj){
      a1 = obj;
      if (!complete){
        complete = true;
        console.log(a1.length);
      } else {
        callback(intersection(a1,a2),i);
      }
    });
    FB.friends(u2, function(obj){
      a2 = obj;
      if (!complete){
        complete = true;
      } else {
        callback(intersection(a1,a2),i);
      }
    });
  }
}
//set intersection method
intersection = function(a, b)
{
  var result = new Array();
  while( a.length > 0 && b.length > 0 )
  {  
    if      (parseInt(a[0].id) < parseInt(b[0].id) ){ a.shift(); }
    else if (parseInt(a[0].id) > parseInt(b[0].id) ){ b.shift(); }
    else 
    {
      result.push(a.shift());
      b.shift();
    }
  }

return result;
}
exports.FB = FB;
