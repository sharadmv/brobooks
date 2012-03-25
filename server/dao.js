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
              callback(new Message("failure",300,err,null));
            } else {
              callback(new Message("success",200,null,result));
            }
          });
        }
      });
    },
    update:function(user, callback) {
      db.user.remove({_id:user._id},function(err,result) {
        if (err){
          callback(new Message("failure",300,err,null));
        } else {
          db.user.insert(user,function(err,result) {
            if (err) {
              callback(new Message("failure",300,err,null));
            } else {
              callback(new Message("success",200,null,result));
            }
          }):
        }
      });
    },
    find:function(user, callback){
      db.user.find(user).toArray(function(err, result){
        if (err) {
          callback(new Message("failure",300,err,null));
        } else {
          callback(new Message("success",200,null,result));
        }
      });
    }
  }
}
exports.Dao = Dao;
