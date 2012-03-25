var Message = require('./model.js').model.Message;
var db = require('mongoskin').db('107.108.20.117:27017/brobooks');
db.bind('user');
var Dao = {
  user:{
    create:function(user, callback){
      db.user.save(user,function(obj){
        console.log(obj);
      });
      callback(new Message("success",200,null));
    }
  }
}
db.user.find({fbId:1234}).toArray(function(err, items) {
  console.dir(items);
});
exports.Dao = Dao;
