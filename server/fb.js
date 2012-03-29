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
  mutual:function(u1, u2,i, callback) {
    var complete = false;
    var a1, a2;
    FB.friends(u1, function(obj){
      a1 = obj;
      if (!complete){
        complete = true;
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
