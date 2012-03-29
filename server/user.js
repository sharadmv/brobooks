var User = function(dao){
  this.dao = dao;
  this.save = function(obj, callback) {
    dao.user.update(obj.user, function(e) {callback(e.result)});
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
