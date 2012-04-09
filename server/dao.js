/**
 * Database Access Object for the MongoDB
 */
//requiring modules
var Message = require('./model.js').model.Message;
var mongo = require('mongoskin');
/*
 * @param host location of MongoDB 
 */
var Dao = function(host){
  db = mongo.db(host);
  //binding names for db object
  db.bind('user');
  db.bind('scraper');
  db.bind('action');
  db.bind('offer');
  db.bind('request');
  db.bind('location');
  db.bind('waitlist');
  /*
   * User DAO
   */
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
      db.user.remove({fbId:user.fbId},function(err,result) {
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
    },
    find:function(user,i, callback){
      db.user.find(user).toArray(function(err, result){
        if (err) {
          callback(new Message("failure",300,err,null));
        } else {
          msg = new Message("success", 200, null, result);
          msg.i = i;
          callback(msg);
        }
      });
    }
  }
  /*
   * Scraper DAO
   */
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
  /*
   * Action DAO
   */
  this.action = {
    create:function(action, callback){
        db.action.insert(action,function(err,result){
          if (err) {
            callback(new Message("failure",300,err,null));
          } else {
            callback(new Message("success",200,null,result[0]));
          }
        });
    },
    update:function(action, callback) {
      db.action.remove({_id:action._id},function(err,result) {
        if (err){
          callback(new Message("failure",300,err,null));
        } else {
          db.action.insert(action,function(err,result) {
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
      db.action.find(action).toArray(function(err, result){
        if (err) {
          callback(new Message("failure",300,err,null));
        } else {
          callback(new Message("success",200,null,result));
        }
      });
    }
  }
  /*
   * Offer DAO
   */
  this.offer = {
    create:function(offer, callback){
        db.offer.insert(offer,function(err,result){
          if (err) {
            callback(new Message("failure",300,err,null));
          } else {
            callback(new Message("success",200,null,result[0]));
          }
        });
    },
    update:function(offer, callback) {
      if (typeof(offer._id)=="string"){
        offer._id=db.bson_serializer.ObjectID.createFromHexString(offer._id);
      }
      db.offer.remove({'user.fbId':offer.user.fbId,'book':offer.book},function(err,result) {
        if (err){
          callback(new Message("failure",300,err,null));
        } else {
          db.offer.insert(offer,function(err,result) {
            if (err) {
              callback(new Message("failure",300,err,null));
            } else {
              callback(new Message("success",200,null,result));
            }
          });
        }
      });
    },
    find:function(offer, callback){
      db.offer.find(offer).toArray(function(err, result){
        if (err) {
          callback(new Message("failure",300,err,null));
        } else {
          callback(new Message("success",200,null,result));
        }
      });
    }
  }
  /**
   * Request DAO
   */
  this.request = {
    create:function(request, callback){
        db.request.insert(request,function(err,result){
          if (err) {
            callback(new Message("failure",300,err,null));
          } else {
            callback(new Message("success",200,null,result[0]));
          }
        });
    },
    update:function(request, callback) {
      db.request.remove({_id:request._id},function(err,result) {
        if (err){
          callback(new Message("failure",300,err,null));
        } else {
          db.request.insert(request,function(err,result) {
            if (err) {
              callback(new Message("failure",300,err,null));
            } else {
              callback(new Message("success",200,null,result));
            }
          });
        }
      });
    },
    find:function(request, callback){
      db.request.find(request).toArray(function(err, result){
        if (err) {
          callback(new Message("failure",300,err,null));
        } else {
          callback(new Message("success",200,null,result));
        }
      });
    }
  }
  /**
   * Location DAO
   */
  this.location = {
    find:function(location, callback){
      db.location.find(location).toArray(function(err, result){
        if (err) {
          callback(new Message("failure",300,err,null));
        } else {
          callback(new Message("success",200,null,result));
        }
      });
    },
    get:function(callback){
      db.location.distinct('general', function(err, result){
        if (err) {
          callback(new Message("failure",300,err,null));
        } else {
          callback(new Message("success",200,null,result));
        }
      });
    }
  }
  /**
   * Waitlist DAO
   */
  this.waitlist = {
    get:function(book, callback){
      db.waitlist.find(book).toArray(function(err,result){
        if (err) {
          callback(new Message("failure",300,err,null));
        } else {
          callback(new Message("success",200,null,result));
        }
      });
    },
    enqueue:function(book, user, callback){
      db.waitlist.find(book).toArray(function(err, result) {
        if (result.length == 0){
          result = {book:book,waitlist:[user]};
        } else {
          result.waitlist.push(user);
        }
        db.waitlist.remove({_id:result._id},function(err,result) {
          if (err){
            callback(new Message("failure",300,err,null));
          } else {
            db.waitlist.insert(result,function(err,result) {
              if (err) {
                callback(new Message("failure",300,err,null));
              } else {
                callback(new Message("success",200,null,result));
              }
            });
          }
        });
      });
    },
    dequeue:function(book, user, callback){
      db.waitlist.find({book:book}).toArray(function(err, result) {
        result.waitlist.shift(user);
        db.waitlist.remove({_id:result._id},function(err,result) {
          if (err){
            callback(new Message("failure",300,err,null));
          } else {
            db.waitlist.insert(result,function(err,result) {
              if (err) {
                callback(new Message("failure",300,err,null));
              } else {
                callback(new Message("success",200,null,result));
              }
            });
          }
        });
      });
    }
  }
}
exports.Dao = Dao;
