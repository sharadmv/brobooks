var util = require('./util.js').util;
var FB = {
  me:function(user, callback){
    util.get('graph.facebook.com','/me?access_token='+user.token,true,function(obj){
      callback(JSON.parse(obj));
    });
  },
  friends:function(user, callback){
    util.get('graph.facebook.com','/me/friends?access_token='+user.token+'&limit=999999',true,function(obj){
      callback(JSON.parse(obj).data);
    });
  },
  mutual:function(u1, u2, callback) {
    var complete = false;
    var a1, a2;
    friends(u1, function(obj){
      if (!complete){
        a1 = obj;
        complete = true;
      } else {
        callback(intersection(a1,a2));
      }
    });
    friends(u2, function(obj){
      if (!complete){
        a2 = obj;
        complete = true;
      } else {
        callback(intersection(a1,a2));
      }
    });
  }
}
intersection = function(a, b)
{
  var result = new Array();
  while( a.length > 0 && b.length > 0 )
  {  
    if      (a[0] < b[0] ){ a.shift(); }
    else if (a[0] > b[0] ){ b.shift(); }
    else /* they're equal */
    {
      result.push(a.shift());
      b.shift();
    }
  }

return result;
}
exports.FB = FB;
