var mysql = require('mysql');
require('./util.js').util.toMysqlFormat();


/*connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});

connection.query('INSERT INTO user values ()', function(err, results) {
  if (err) throw err;

  console.log(results);
});*/

//connection.end();

var Dao = function() {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'brobooks'
  });

  connection.connect();
  this.user = {
    save: function (user, callback) {
      var params = [user.fbId, user.accessToken, user.email, user.accessToken, user.email];
      connection.query('INSERT INTO user (fb_id, access_token, email) values (?, ?, ?) ' +
        'ON DUPLICATE KEY UPDATE access_token=?, email=?',
        params, function (err, result) {
          if (err) throw err;
          callback(result);
        });
    },
    getId: function (user, callback) {
      var params = [user.fbId];
      connection.query('SELECT user_id FROM user WHERE fb_id=?', params, function (err, result) {
        if (err) throw err;
        callback(result[0]);
      });
    }
  };

  this.action = {
    update: function (action, callback) {
      var params = [action.status, action.code, action.error ? "": action.error, action.result.service.join("."),
        action.result.start.toMysqlFormat(), action.result.end.toMysqlFormat(), JSON.stringify(action.result.params)];
      connection.query('INSERT INTO action (status, code, error, service, start, end, params) ' +
        'values (?, ?, ?, ?, ?, ?, ?)',
        params, function (err, result) {
          if (err) throw err;
          callback(result);
        });
    }
  };
};

exports.Dao = Dao;
