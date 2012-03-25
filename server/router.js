var model = require('./model.js').model;
var Message = model.Message;
var Router = function(s, d){
  this.dao = d;
  this.scraper = {
    catalog:function(obj, callback){
      s.catalog(obj, callback);  
    },
    course:function(obj, callback){
      var id = {type:'course',params:{'year':obj['year'],'term':obj['term'],'name':obj['name'],'num':obj['num']}}
      var stId = JSON.stringify(id);
      obj.id = stId;
      dao.scraper.find(obj, function(message) {
        if (message.code != 200) {
          callback(message);
        } else {
          if (message.result.length!=1){
            s.course(obj, function(msg){
              dao.scraper.update({id:obj.id,result:msg.result}, function(m){
                if (m.code == 200) {
                  console.log("Scraper Cache Updated: "+obj.id);
                } else {
                  console.log("Scraper Cache Error: "+obj.err);
                }
              });
              callback(msg);
            });
          } else {
            callback(message);
          }
        }
      });
    },
    book:function(obj, callback){
    }
  };
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
