/*
 * Util class used by other modules
 */
var http = require('http');
var https = require('https');
var Mail = require('mail').Mail;
var mail = require('mail').Mail({
  host: 'smtp.gmail.com',
  username: 'brobooks.browl@gmail.com',
  password: 'geraldsharad'
});
var fs = require('fs');

var util = {
  get:function(h, p, safe, callback){
    if (safe) {
      prot = https;
    } else {
      prot = http;
    }

    var dataChunks = "";
    var options = {
      host: h,
      path: p
    };
    prot.get(options,
      function(r) {
        util.process(r,dataChunks, callback);
    }).on('error',
      function(e) {
        console.log("Got error: " + e.message);
    });
  },
  post:function(post_domain, post_port, post_path, data, callback){
    var dataChunks = "";
    post_options = {
      host: post_domain,
      port: post_port,
      path: post_path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data.length
      }
    };
    post_req = http.request(post_options, function(re) {
      util.process(re,dataChunks, callback);
    });
    post_req.write(data);
    post_req.end();
  },
  process:function(res,dataChunks, callback) {
    res.on('data', function(chunk){
      dataChunks += chunk.toString('ascii');
    });
    res.on('end', function(){
      callback(dataChunks)
    });
  },
  mail:function(addrs, cc, subj, message){
    mail.message({
      from: 'browl@brobooks.com',
      to:addrs,
      cc: cc,
      subject:subj
    })
    .body(message)
    .send(function(err) {
      if (err) console.log(err);
        console.log('Sent!');
    });
  },

  toMysqlFormat: function () {
    function twoDigits(d) {
      if(0 <= d && d < 10) return "0" + d.toString();
      if(-10 < d && d < 0) return "-0" + (-1*d).toString();
      return d.toString();
    }

    Date.prototype.toMysqlFormat = function() {
      return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) +
      " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
    };
  },

  depts: function (callback) {
    fs.readFile('./depsShort.txt', function (err, result) {
      if (err) callback(err);
      callback(false, result.toString().split('\n').sort());
    });
  },

  hasParams: function (obj, params) {
    for (var i = 0; i < params.length; i++) {
      if (typeof(obj[params[i]]) === "undefined") {
        return false;
      }
    }
    return true;
  },

  capitalize: function(str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
  },

  underscoreToCamel: function (str) {
    var words = str.split("_");
    if (words.length == 1) {
      return words[0];
    }
    for (var i = 1; i < words.length; i++) {
      words[i] = util.capitalize(words[i]);
    }

    return words.join('');
  },

  sqlToJson: function (obj) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key.indexOf("_") !== -1) {
        obj[util.underscoreToCamel(key)] = obj[key];
        delete obj[key];
      }
    }
  }
};
exports.util = util;
