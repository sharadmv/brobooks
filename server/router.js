var model = require('./model.js').model;
var Message = model.Message;
var Router = function(scraper){
  this.scraper = scraper;
  this.route = function(service, params, callback){
    if (this[service[0]]) {
      if (this[service[0]][service[1]]){
        this[service[0]][service[1]](params, function(obj){
          callback(new Message("success",200,null, obj));
        }); 
      } else {
        callback(new Message("failure",101,"service method does not exist", null));
      }
    } else {
      callback(new Message("failure",100,"service does not exist", null)); 
    }
  } 
} 
exports.Router = Router;
