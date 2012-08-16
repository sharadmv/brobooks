/**
 * User encapsulation model
 */
var User = function(dao){
  this.dao = dao;
  var self = this;
  this.getId = function (user, callback) {
    dao.user.getId(user, callback);
  };

  this.save = function(user, callback) {
    dao.user.save(user, function(e) {
      if (e.insertId == 0) {
        self.getId(user, function(id) {
          callback(id);
        });
      } else {
        callback(e.insertId)
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
exports.User = User;
