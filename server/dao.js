var client = new require('mysql').createClient();
Dao = function(host,port,user,password,database) {
  client.host = host;
  client.port = port;
  client.user = user;
  client.password = password;
  client.database = database;
  this.User = {
    create:function(user, callback){
    	client.query("insert into user(email,token) values('"+user.email+"','"+user.token+"')", function selectCb(err,result,field){
				if (!err) {
					client.query("select * from user where email = '"+user.email+"' and token = '"+user.token+"'", function selectCb(err, result, field) {
						callback(err, result, field);
					});
				} else {
					callback(err, result);
				}
			});
    },
		get:function(user, callback) {
			delimiter = " where ";
			where = "";
			for (var key in user){
				where += delimiter + key+" = '"+user[key]+"'";
				delimiter = " and ";
			}
			client.query("select * from user"+where, function selectCb(err,result,field){
				callback(err, result);
			});
		},	
		update:function(user, callback) {
			client.query("update user set email='"+user.email+"' where user_id = "+user.user_id, function selectCb(err, result, field) {
				callback(err, result);
			});
		}
  }
};
exports.Dao = Dao
