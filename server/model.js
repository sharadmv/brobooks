/**
 * Contains simple models used by other modules
 */
model = {
  Message:function(status,code,message,result){
    this.status = status;
    this.code = code;
    this.result = result;
    this.message = message;
  },
  Response:function(status, code, message, params, start, end, result){
    this.status = status;
    this.code = code;
    this.message = message;
    this.params = params;
    this.start = start;
    this.end = end;
    this.duration = end - start;
    this.result = result;
  },
  User:function(fbId, accessToken, email) {
    this.fbId= fbId;
    this.accessToken = accessToken;
    this.email = email;
  },
	Course:function(year, term, name, lecture, books){
    this.year = year;
    this.term = term;
    this.name = name;
    this.lecture = lecture;
    this.books = books;
	},
	Book:function(title, author, edition, isbn, requests, offers, condition){
    this.title = title;
    this.author = author;
    this.edition = edition;
    this.isbn = isbn;
    this.requests = requests;
    this.offers = offers;
    this.condition = condition;
	},
  Request:function(user, book, state) {
    this.user = user;
    this.book = book;
    this.state = state;
  },
  Offer:function(userId, dept, course, title, price, loc, author, edition, fulfilled, condition) {
    this.userId = userId;
    this.dept = dept;
    this.course = course;
    this.title = title;
    this.price = price;
    this.loc = loc;
    this.author = author;
    this.edition = edition;
    this.fulfilled = fulfilled;
    this.condition = condition;
  },
  Fill: function (userId, offerId, price, loc, time) {
    this.userId = userId;
    this.offerId = offerId;
    this.price = price;
    this.loc = loc;
    this.time = time;
  }
}
exports.model = model;
