var model = require('./model.js').model;
var User = require('./user.js').User;
var Request = require('./request.js').Request;
var Offer = require('./offer.js').Offer;
var Message = model.Message;
var Router = function(s, d){
  var dao = d;
  this.user = new User(d);
  this.request = new Request(d);
  this.offer = new Offer(d);
  var Scraper = function(dao){
    this.catalog=function(obj, callback){
      s.catalog(obj, callback);  
    }
    this.course=function(obj, callback){
      var id = {type:'course',params:{'year':obj['year'],'term':obj['term'],'name':obj['name'],'num':obj['num']}}
      var stId = JSON.stringify(id);
      dao.scraper.find({id:stId}, function(message) {
        if (message.code != 200) {
          callback([]);
        } else {
          if (!message.result || !(message.result.length==1)){
            s.course(obj, function(r){
              msg = new Message("success",200,null,r);
              dao.scraper.update({id:stId,result:r}, function(m){
                if (m.code == 200) {
                  console.log("Scraper Cache Updated: "+stId);
                } else {
                  console.log("Scraper Cache Error: "+obj.err);
                }
              });
              callback(msg.result);
            });
          } else {
            dao.scraper.update({id:stId,result:message.result[0].result}, function(m){
              if (m.code == 200) {
                console.log("Scraper Cache Updated: "+stId);
              } else {
                console.log("Scraper Cache Error: "+message.err);
              }
            });
            callback(message.result[0].result);
          }
        }
      });
    }
    this.book=function(obj, callback){
      var id = {type:'book',params:{'year':obj['year'],'term':obj['term'],'ccn':obj['ccn']}}
      var stId = JSON.stringify(id);
      dao.scraper.find({id:stId}, function(message) {
        if (message.code != 200) {
          console.log(message);
          callback([]);
        } else {
          if (!message.result || !(message.result.length==1)){
            s.book(obj, function(r){
              msg = new Message("success",200,null,r);
              dao.scraper.update({id:stId,result:r}, function(m){
                if (m.code == 200) {
                  console.log("Scraper Cache Updated: "+stId);
                } else {
                  console.log("Scraper Cache Error: "+obj.err);
                }
              });
              callback(msg.result);
            });
          } else {
            dao.scraper.update({id:stId,result:message.result[0].result}, function(m){
              if (m.code == 200) {
                console.log("Scraper Cache Updated: "+stId);
              } else {
                console.log("Scraper Cache Error: "+message.err);
              }
            });
            callback(message.result[0].result);
          }
        }
      });
    }
  };
  this.scraper = new Scraper(d);
  this.route = function(service, params, callback){
    router = this;
    action = {start:new Date(), end:null,service:service,params:params};
    if (router[service[0]]) {
      if (router[service[0]][service[1]]){
        router[service[0]][service[1]](params, function(obj){
          action.end = new Date();
          d.action.update(new Message("success",200,null,action),function(message){
            callback(new Message("success",200,null, obj));
          });
        }); 
      } else {
        action.end = new Date();
        d.action.update(new Message("failure",101,"service method does not exist",action),function(message){
          callback(new Message("failure",101,"service method does not exist", null));
        });
      }
    } else {
      action.end = new Date();
      d.action.update(new Message("failure",100,"service does not exist",action),function(message){
        callback(new Message("failure",100,"service does not exist", null)); 
      });
    }
  } 
} 
exports.Router = Router;
