var User = function(dao){
  this.dao = dao;
  this.save = function(user, callback) {
    dao.user.update(user, callback);
  }
  this.remove = function(user, callback) {
    dao.user.remove(user, callback);
  }
  this.login = function(user, callback) {
    dao.user.find(user, function(message) {
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
