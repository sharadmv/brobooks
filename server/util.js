var util = {
  get:function(h, p, callback){
    dataChunks = "";
    var options = {
      host: h, 
      path: p
    };
    http.get(options, 
      function(r) { 
        util.process(r,callback);
    }).on('error', 
      function(e) { 
        console.log("Got error: " + e.message); 
    });
  },
  post:function(post_domain, post_port, post_path, data, callback){
    dataChunks = "";
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
      util.process(re, callback);
    }); 
    post_req.write(data); 
    post_req.end();
  },
  process:function(res, callback) {
    res.on('data', function(chunk){
      dataChunks += chunk.toString('ascii');
    });
    res.on('end', function(){
      callback(dataChunks)
    });
  }
};
exports.util = util;
