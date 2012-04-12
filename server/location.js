/*
 * Location encapsulation model
 */
var location = function(dao){
  this.find = function(obj, callback){
    dao.location.find(obj,function(message){
      if (message.code == 200){
        callback(message.result);
      } else {
        callback(message.message);
      }
    });
  }
  this.distinct = function(obj, callback){
    dao.location.get(function(message){
      if (message.code == 200){
        callback(message.result);
      } else {
        callback(message.message);
      }
    });
  }
}  
exports.Location = location;
