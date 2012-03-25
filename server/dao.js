var Message = require('./model.js').model.Message;
var db = require('mongoskin').db('localhost:27017/brobooks');
db.bind('user');
var Dao = {
  user:{
    create:function(user, callback){
      db.user.find({fbId:user.fbId}).toArray(function(err, result){
        if (result.length>0){
          callback(new Message("failure",301,"user exists", null));
        } else {
          db.user.insert(user,function(err,result){
            if (err) {
              callback(new Message("success",300,err,null));
            } else {
              callback(new Message("success",200,null,result));
            }
          });
        }
      });
    }
  }
}
exports.Dao = Dao;
