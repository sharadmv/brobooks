var Message = require('./model.js').model.Message;
var db = require('mongoskin').db('localhost:27017/brobooks');
db.bind('user');
var Dao = {
  user:{
    create:function(user, callback){
      db.user.save(user);
      callback(
    }
  }
}
db.user.find({fbId:1234}).toArray(function(err, items) {
  console.dir(items);
});
exports.Dao = Dao;
