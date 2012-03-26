var Message = require('./model.js').model.Message;
var mongo = require('mongoskin');
var Dao = function(host){
  db = mongo.db(host);
  db.bind('user');
  db.bind('scraper');
  db.bind('event');
  this.user = {
    create:function(user, callback){
      db.user.find({fbId:user.fbId}).toArray(function(err, result){
        if (result.length>0){
          callback(new Message("failure",301,"user exists", null));
        } else {
          db.user.insert(user,function(err,result){
            if (err) {
              callback(new Message("failure",300,err,null));
            } else {
              callback(new Message("success",200,null,result));
            }
          });
        }
      });
    },
    update:function(user, callback) {
      db.user.remove({_id:user._id},function(err,result) {
        if (err){
          callback(new Message("failure",300,err,null));
        } else {
          db.user.insert(user,function(err,result) {
            if (err) {
              callback(new Message("failure",300,err,null));
            } else {
              callback(new Message("success",200,null,result));
            }
          });
        }
      });
    },
    find:function(user, callback){
      db.user.find(user).toArray(function(err, result){
        if (err) {
          callback(new Message("failure",300,err,null));
        } else {
          callback(new Message("success",200,null,result));
        }
      });
    }
  }
  this.scraper = {
    create:function(scrape, callback){
      db.scraper.find({id:scrape.id}).toArray(function(err, result){
        if (result.length>0){
          callback(new Message("failure",301,"scrape exists", null));
        } else {
          db.scrape.insert(scrape,function(err,result){
            if (err) {
              callback(new Message("failure",300,err,null));
            } else {
              callback(new Message("success",200,null,result));
            }
          });
        }
      });
    },
    update:function(scrape, callback) {
      db.scraper.remove({id:scrape.id},function(err,result) {
        if (err){
          callback(new Message("failure",300,err,null));
        } else {
          db.scraper.insert(scrape, function(err,result) {
            if (err) {
              callback(new Message("failure",300,err,null));
            } else {
              callback(new Message("success",200,null,result));
            }
          });
        }
      });
    },
    find:function(scrape, callback){
      db.scraper.find({id:scrape.id}).toArray(function(err, result){
        if (err) {
          callback(new Message("failure",300,err,null));
        } else {
          callback(new Message("success",200,null,result));
        }
      });
    }
  }
  this.action = {
    create:function(action, callback){
      if (result.length>0){
        callback(new Message("failure",301,"user exists", null));
      } else {
        db.user.insert(action,function(err,result){
          if (err) {
            callback(new Message("failure",300,err,null));
          } else {
            callback(new Message("success",200,null,result));
          }
        });
      }
    },
    update:function(action, callback) {
      db.user.remove({_id:action._id},function(err,result) {
        if (err){
          callback(new Message("failure",300,err,null));
        } else {
          db.user.insert(action,function(err,result) {
            if (err) {
              callback(new Message("failure",300,err,null));
            } else {
              callback(new Message("success",200,null,result));
            }
          });
        }
      });
    },
    find:function(action, callback){
      db.user.find(action).toArray(function(err, result){
        if (err) {
          callback(new Message("failure",300,err,null));
        } else {
          callback(new Message("success",200,null,result));
        }
      });
    }
  }
  }
  exports.Dao = Dao;
