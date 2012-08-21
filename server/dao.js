var mysql = require('mysql');
var Util = require('./util.js').util

Util.toMysqlFormat();

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
      var params = [user.fbId, user.accessToken, user.email, user.name, user.accessToken, user.email, user.name];
      connection.query('INSERT INTO user (fb_id, access_token, email, name) values (?, ?, ?, ?) ' +
        'ON DUPLICATE KEY UPDATE access_token=?, email=?, name=?',
        params, function (err, result) {
          if (err) callback(err);
          callback(false, result);
        });
    },

    getUser: function (userId, callback) {
      var query = connection.query('SELECT * FROM user WHERE user_id=?', [userId], function (err, result) {
        if (err) callback(err);

        if (result.length === 0) {
          callback(new Error("No users found with id " + userId))
          return;
        }
        var user = result[0];
        Util.sqlToJson(user);
        callback(false, user);
      });
    },
    getId: function (user, callback) {
      var params = [user.fbId];
      connection.query('SELECT user_id FROM user WHERE fb_id=?', params, function (err, result) {
        if (err) callback(err);

        callback(false, result[0].user_id);
      });
    }
  };

  this.fill = {
    create: function (fill, callback) {
      var mysqlFill = {
        user_id: fill.userId,
        offer_id: fill.offerId,
        loc: fill.loc,
        time: fill.time,
        contact: fill.contact
      };
      connection.query('INSERT INTO fill SET ?', mysqlFill, function (err, result) {
        if (err) callback(err);

        fill.fillId = result.insertId;
        callback(false, fill);
      });
    },

    getFill: function (fillId, callback) {
      var query = connection.query('SELECT * FROM fill WHERE fill_id=?', [fillId], function (err, result) {
        if (err) callback(err);

        var fill = result[0];
        Util.sqlToJson(fill);
        callback(false, fill);
      });
    }
  };

  this.offer = {
    create: function (offer, callback) {
      var mysqlOffer = {
        user_id: offer.userId,
        dept: offer.dept,
        course: offer.course,
        title: offer.title,
        price: offer.price,
        loc: offer.loc,
        time: offer.time,
        contact: offer.contact,
        author: offer.author,
        edition: offer.edition,
        fulfilled: false,
        condition: offer.condition,
        isbn: offer.isbn
      };
      connection.query('INSERT INTO offer SET ?', mysqlOffer, function (err, result) {
        if (err) callback(err);

        offer.offerId = result.insertId;
        callback(false, offer);
      });
    },

    getOffer: function (offerId, callback) {
      connection.query('SELECT * FROM offer where offer_id=?', [offerId], function (err, result) {
        if (err) callback(err);

        var offer = result[0];
        Util.sqlToJson(offer)
        callback(false, offer);
      });
    },

    getByUser: function (userId, callback) {
      connection.query('SELECT o.*, f.fill_id FROM offer o left join fill f on o.offer_id=f.offer_id WHERE o.user_id=?', [userId], function (err, result) {
        if (err) callback(err);

        for (var i = 0; i < result.length; i++) {
          Util.sqlToJson(result[i]);
        }

        callback(false, result);
      });
    },

    update: function (offer, callback) {
      var mysqlOffer = {
        dept: offer.dept,
        course: offer.course,
        title: offer.title,
        price: offer.price,
        loc: offer.loc,
        time: offer.time,
        contact: offer.contact,
        author: offer.author,
        edition: offer.edition,
        fulfilled: offer.fulfilled,
        condition: offer.condition,
        isbn: offer.isbn
      };
      var query = connection.query('UPDATE offer SET ? where offer_id=?', [mysqlOffer, offer.offerId], function (err, result) {
        if (err) callback(err);

        callback(false, offer);
      });
    },

    delete: function (offerId, callback) {
      var params = [offerId];
      var query = connection.query('DELETE FROM offer WHERE offer_id=?', params, function (err, result) {
        if (err) callback(err);

        callback(false, result);
      });
    },

    fill: function (offerId, callback) {
      connection.query('UPDATE offer SET fulfilled=true WHERE offer_id=?', [offerId], function (err, result) {
        if (err) callback(err);
        callback(false, result);
      });
    },

    getAll: function (callback) {
      connection.query('SELECT * FROM offer WHERE fulfilled="false" order by dept, course', function (err, result) {
        if (err) callback(err);

        for (var i = 0; i < result.length; i++) {
          Util.sqlToJson(result[i]);
        }
        callback(false, result);
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
          if (err) callback(err);
          callback(false, result);
        });
    }
  };
};

exports.Dao = Dao;
