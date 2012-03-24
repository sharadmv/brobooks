model = {
  User:function(fbId, email, requests, offers) {
    this.fbId= fbId;
    this.requests = requests;
    this.offers = offers;
  },    
	Course:function(year, term, name, lecture, books){
    this.year = year;
    this.term = term;
    this.name = name;
    this.lecture = lecture;
    this.books = books;      
	},
	Book:function(title, author, edition, isbn, requests, offers){
    this.title = title;
    this.author = author;
    this.edition = edition;
    this.isbn = isbn;
    this.requests = requests;
    this.offers = offers;
	},
  Request:function(user, book, state) {
    this.user = user;
    this.book = book;
    this.state = state;
  },
  Offer:function(user,book,state,price,comment,time,loc) {
    this.user = user;
    this.book = book;
    this.state = state;
    this.price = price;
    this.comment = comment;
    this.time = time;
    this.loc = loc;
  }
}
exports.model = model;
