var User = require('./model.js').model.User;
/**
 * User encapsulation model
 */
var UserService = function(dao){
  this.dao = dao;
  var self = this;
  this.getId = function (obj, callback) {
    dao.user.getId(obj, callback);
  };

  this.getUser = function (obj, callback) {
    dao.user.getUser(obj.userId, callback);
  };

  this.save = function(obj, callback) {
    var user = new User(obj.fbId, obj.accessToken, obj.email, obj.name);
    dao.user.save(user, function(err, result) {
      if (result.insertId == 0) {
        self.getId(user, function(err, id) {
          user.id = id;
          callback(err, user);
        });
      } else {
        user.id = result.insertId;
        callback(err, user);
      }
    });
  }

  this.remove = function(obj, callback) {
    dao.user.remove(obj.user, callback);
  }
  this.login = function(obj, callback) {
    dao.user.find(obj.user, function(message) {
      if (message.code == 200){
        if (message.result > 0){
          callback(message);
        } else {
          callback(new Message("failure",400,"authentication failed",null));
        }
      } else {
        callback(message);
      }
    });
  }
}
exports.UserService = UserService;
