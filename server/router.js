/*
 * Router class for REST API services
 */
//requiring modules
var model = require('./model.js').model;
var UserService = require('./userService.js').UserService;
var Request = require('./request.js').Request;
var OfferService = require('./offerService.js').OfferService;
var Location = require('./location.js').Location;
var FillService = require('./fillService.js').FillService;
var Message = model.Message;
/*
 * Router class that takes a scraper and dao in the constructor
 */
var Router = function(s, d){
  var dao = d;
  //setting up routing objects
  this.user = new UserService(d);
  this.request = new Request(d);
  this.location = new Location(d);
  this.waitlist = {
    enqueue:function(obj, callback){
      if (obj){
      if (obj.book){
        d.waitlist.enqueue(obj.book, obj.user, callback);
      } else {
        callback(null);
      }
      }
      else {
        callback(null);
      }
    },
    dequeue:function(obj, callback){
      if (obj){
      if (obj.book) {
        d.waitlist.dequeue(obj.book, obj.user, callback);
      } else {
        callback(null);
      }
      } else {
        callback(null);
      }
    },
    get:function(obj, callback){
      if (obj){
      if (obj.book) {
        d.waitlist.get(obj.book, callback);
      } else {
        callback(null);
      }
      } else {
        callback(null);
      }
    }
  }
  this.offer = new OfferService(d, this.waitlist);
  this.fill = new FillService(d, this.user, this.offer);
  /**
   * Scraper router intercepts scrape requests and looks in the MongoDB cache. If present, it grabs the DB entry and then fires off an asynchronous scrape request to update the DB. If not present, it just redirects the scraping request
   */
  var Scraper = function(dao){
    this.catalog=function(obj, callback){
      s.catalog(obj, callback);
    }
    this.course=function(obj, callback){
      var id = {type:'course',params:{'year':obj['year'],'term':obj['term'].toLowerCase(),'name':obj['name'].toLowerCase(),'num':obj['num'].toLowerCase()}}
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
      var id = {type:'book',params:{'year':obj['year'],'term':obj['term'].toLowerCase(),'ccn':obj['ccn']}}
      var stId = JSON.stringify(id);
      dao.scraper.find({id:stId}, function(message) {
        if (message.code != 200) {
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
  /**
   * IMPORTANT: routing function
   * It looks for services located in objects in this class. If not present, it returns an error message. if not, it records the action and forwards the request
   */
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
