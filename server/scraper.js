var http = require('http');
var fs = require('fs');
var dataChunks = "";
var classes = [];
//Load autocomplete
fs.readFile('classes.txt', function(err,data){
  if(err) {
    console.error("Could not open file: %s", err);
    process.exit(1);
  }
  classes = data.toString('ascii').split("\n");
});
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
var scrapers = {
  catalog:function(obj, callback) {
    var name = obj.name;
    var temp = [];
    for (var i in classes){
      if (classes[i].indexOf(name) != -1 ) {
        temp.push(classes[i]);
      }
    } 
    callback(temp);
    /*util.post('sis.berkeley.edu',80,'/catalog/gcc_search_sends_request','p_offering=spring', function(str){
      console.log(str.match(/[(].*?[)]/g));
    });*/
  },
  course:function(year, term, name, num, callback) {
    if (term.toLowerCase() == 'spring') {
      term = 'SP';
    } else if (term.toLowerCase() == 'summer') {
      term = 'SU';
    } else if (term.toLowerCase() == 'fall') {
      term = 'FL';
    }
    name = name.replace(/ /g,"%20");
    util.get('osoc.berkeley.edu','/OSOC/osoc?&p_term=SP&p_course='+num+'&p_dept='+name,
      function(str) {
        var reg = /<FONT.*?<\/TD>.*?<\/TD>/g;
        var foo = str.match(reg);
        var courses = {lec:[],dis:[],lab:[],sem:[]};
        obj = {}; val = null;
        for (var i in foo) {
          bar = foo[i].replace(/<[\/]?.*?>/g,'').replace(/&.*?;/g,'').split(":");
          field = bar[0].toLowerCase().replace(/ /g,"_");
          delimiter = "";
          value = "";
          for (var k = 1;k<bar.length;k++){
            value += delimiter + bar[k];
            delimiter = " ";
          }
          if (field == 'course'){
            if (!val) {
              if (value.indexOf('LEC') != -1){
                val = 'lec';
              } else if (value.indexOf('DIS') != -1){
                val = 'dis';
              } else if (value.indexOf('LAB') != -1){
                val = 'lab';
              } else if (value.indexOf('SEM') != -1){
                val = 'sem';
              }
            } else {
              courses[val].push(obj);
            }
            if (value.indexOf('LEC') != -1){
                val = 'lec';
              } else if (value.indexOf('DIS') != -1){
                val = 'dis';
              } else if (value.indexOf('LAB') != -1){
                val = 'lab';
              } else if (value.indexOf('SEM') != -1){
                val = 'sem';
              }
              obj = {};
          }
          if (field == 'course_control_number'){
            field = 'ccn';
          } else if (field == 'units/credit'){
            field = 'units';
          } else if (field == 'status/last_changed'){
            field = 'status';
          } else if (field.indexOf('enrollment') != -1) {
            field = 'enrollment';
          }
          obj[field] = value.trim();
        }
        callback(courses);
      }
    );
  },
  isbn:function(isbn, callback){
    util.get('isbndb.com','/api/books.xml?access_key=LEIREUYB&index1=isbn&value1='+isbn,
      function(str){
      
      }
    );
  },
  book:function(obj, callback){
    var year = obj.year;
    var term = obj.term;
    var ccn = obj.ccn;
    if (term.toLowerCase() == "fall"){
      term = "D";
    } else if (term.toLowerCase() == "spring"){
      term = "B";
    }
    util.post('www.bkstr.com',80,'/webapp/wcs/stores/servlet/booklookServlet',"bookstore_id-1=554&term_id-1="+year+term+"&div-1=&crn-1="+ccn,
      function(str){
        str = str.replace(/[\n\t]/g,"");
        var r = /<[ ]*?li[ ]*?>.*?<\/li>/g;
        m = str.match(r);
        obj = {};
        books = [];
        for (var key in m) {
          temp = m[key].replace(/<[ ]*?[\/]?[ ]*?li[ ]*?>/g,'').trim(); 
          field = temp.split(":");
          main = field[0].toLowerCase().replace(/ /g,"_");
          if (main.indexOf("title") != -1 && Object.keys(obj).length > 0) {
            books.push(obj);
            obj = {};
          }
          foo = "";delimiter = "";
          for (var i = 1;i<field.length;i++){
            foo+=field[i];
            foo+=delimiter;
            delimiter = ":";
          } 
          obj[main] = foo; 
        }
        books.push(obj);
        callback(books);
      }
    );
  }
};
/*
scrapers.book('2012','spring','26335', function(books){
//  console.log(books);
});
scrapers.course('2012','spring','comp sci','61b', function(courses){
  //console.log(courses);
});
*/
exports.Scrapers = scrapers;
