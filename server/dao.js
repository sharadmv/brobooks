var db = require('mongoskin').db('localhost:27017/brobooks');
var Dao = {
}
db.bind('user');
db.user.find({fbId:1234}).toArray(function(err, items) {
  console.dir(items);
});
exports.Dao = Dao;
