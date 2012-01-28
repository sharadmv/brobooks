var client = new require('mysql').Client();
Dao = function(host,port,user,password,database) {
  client.host = host;
  client.port = port;
  client.user = user;
  client.password = password;
  client.database = database;
  client.query('select * from user',function selectCb(err,result,field){
    console.log(err,result,field);
  });
  this.User = {
    createUser:function(user){
       
    }
  }
};
exports.Dao = Dao;
