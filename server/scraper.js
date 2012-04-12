/*
 * Scraper class for acquiring class data
 */
//requiring node modules
var fs = require('fs');
var dataChunks = "";
var classes = [];
var deps = [];
/*
 * a GET/POST util class
 */
var util = require('./util.js').util;
//Load autocomplete
fs.readFile('classes.txt', function(err,data){
  if(err) {
    console.error("Could not open file: %s", err);
    process.exit(1);
  }
  raw = data.toString('ascii').split("\n");
  for (var i in raw) {
    var temp = raw[i].split(" ");
    classes.push({dep:temp.splice(0,temp.length-1).join(" "),num:temp[temp.length-1]});
  } 
  scrapers.catalog({name:"cs61b"},function(obj){
    console.log(obj);
  });
});
fs.readFile('deps.txt', function(err,data){
  if(err) {
    console.error("Could not open file: %s", err);
    process.exit(1);
  }
  raw = data.toString('ascii').split("\n");
  for (var i in raw) {
    if (raw[i] != ''){
      var abbrev = raw[i].substring(raw[i].indexOf("(")).trim().replace(/[()]/g,'');
      var name= raw[i].replace(/\(.*?\)/g,'').trim();
      deps.push({name:name,abbrev:abbrev});
    }
  } 
});
var scrapers = {
  /**
   * Grabs data from the cached catalog file
   */
  catalog:function(obj, callback) {
    var name = obj.name.trim();
    var dep = name.replace(/[rR]?[0-9]+?[a-zA-Z]*?$/g,'').trim();
    var t = name.match(/[rR]?[0-9]+?[a-zA-Z]*?$/g);
    var num;
    if (t == null){
      num = "";
    } else {
      num = t[t.length-1];
    }
    var spec = [];
    var temp = [];
    if (dep == 'cs'){
      dep = 'compsci';
    }
    if (dep=='ee'){
      dep = 'el eng';
    }
    console.log(dep,num);
    for (var i in deps){
      if (deps[i].name.toLowerCase().indexOf(dep.toLowerCase())!=-1){
        spec.push(deps[i].abbrev); 
      }
    }
    for (var i in classes){
        var str = classes[i].dep+" "+classes[i].num;
        if ((classes[i].dep.toLowerCase().indexOf(dep.toLowerCase()) != -1 && classes[i].num.toLowerCase().indexOf(num.toLowerCase())!=-1)){
          temp.push(str);
        }
        for (var j in spec) {
          if (classes[i].dep.toLowerCase().indexOf(spec[j].toLowerCase()) != -1 && classes[i].num.toLowerCase().indexOf(num.toLowerCase())!=-1)   {
            if (temp.indexOf(str)==-1){
              temp.push(str);
            }
          }
        }
      }
    callback(temp);
  },
  /**
   * Grabs data from the OSOC schedule search
   */
  course:function(obj, callback) {
    var year = obj['year']
    var num = obj['num']
    var term = obj['term'];
    if (obj['term'].toLowerCase() == 'spring') {
      term = 'SP';
    } else if (term.toLowerCase() == 'summer') {
      term = 'SU';
    } else if (term.toLowerCase() == 'fall') {
      term = 'FL';
    }
    var name = obj['name'].replace(/ /g,"%20");
    util.get('osoc.berkeley.edu','/OSOC/osoc?&p_term='+term+'&p_course='+num+'&p_dept='+name,false,
      function(str) {
        var reg = /<FONT.*?<\/TD>.*?<\/TD>/g;
        var foo = str.match(reg);
        var courses = {lec:[],dis:[],lab:[],sem:[],slf:[]};
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
          if (i == foo.length - 1 ||field == 'course'){
            s = value.trim().split(" ");
            if (!val) {
              if (s[s.length-1] == 'LEC'){
                val = 'lec';
              } else if (s[s.length-1] == 'DIS'){
                val = 'dis';
              } else if (s[s.length-1] == 'LAB'){
                val = 'lab';
              } else if (s[s.length-1] == 'SEM'){
                val = 'sem';
              } else if (s[s.length-1] == 'SLF') {
                val = 'slf';
              }
            } else {
              courses[val].push(obj);
            }
              if (s[s.length-1] == 'LEC'){
                val = 'lec';
              } else if (s[s.length-1] == 'DIS'){
                val = 'dis';
              } else if (s[s.length-1] == 'LAB'){
                val = 'lab';
              } else if (s[s.length-1] == 'SEM'){
                val = 'sem';
              } else if (s[s.length-1] == 'SLF') {
                val = 'slf';
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
  /*
   * Partially implemented but unused ISBN book function
   */
  isbn:function(isbn, callback){
    util.get('isbndb.com','/api/books.xml?access_key=LEIREUYB&index1=isbn&value1='+isbn,false,
      function(str){

      }
    );
  },
  /**
   * Book scraping function that grabs bkstr.com data
   */
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
/* TEST CODE
 scrapers.book({year:'2012',term:'spring',ccn:'26335', function(books){
 //  console.log(books);
 });
 /*
scrapers.course({year:'2012',term:'fall',name:'el eng',num:'20n'}, function(courses){
  //console.log(courses);
});
*/
exports.Scrapers = scrapers;
