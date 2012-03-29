var http = require('http');
var https = require('https');
var Mail = require('mail').Mail;
var mail = require('mail').Mail({
  host: 'smtp.gmail.com',
  username: 'brobooks.browl@gmail.com',
  password: 'geraldsharad'
});
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
  mail:function(addrs, subj, message){
    mail.message({
      from: 'browl@brobooks.com',
      to:addrs, 
      subject:subj
    })
    .body(message)
    .send(function(err) {
      if (err) console.log(err);
        console.log('Sent!');
    });
/*
    var msg = new Email({
      to : addr,
      from : "obama@whitehouse.gov",
      subject : subject,
      body: message 
     });
     msg.send(function(err){
       if(err){ console.log(err); }
     }); 
*/
  }
};
exports.util = util;
