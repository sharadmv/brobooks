var util = require('./util.js').util;
var FB = {
  me:function(user, callback){
    util.get('graph.facebook.com','/me?access_token='+user.token,true,function(obj){
      callback(JSON.parse(obj));
    });
  },
  friends:function(user, callback){
    util.get('graph.facebook.com','/me/friends?access_token='+user.token,true,function(obj){
      callback(JSON.parse(obj));
    });
  }
}
exports.FB = FB;
