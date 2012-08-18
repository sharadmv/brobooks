var onFbLogin;

(function () {

  var UserModel = Backbone.Model.extend({
    initialize: function () {
      this.loggedIn = false;
      x = this;
      onFbLogin = this.onFbLogin.bind(this);
    },

    onFbLogin: function (response) {
      if (response.status === 'connected') {
        this.fbId = response.authResponse.userID;
        this.accessToken = response.authResponse.accessToken;
        this.loggedIn = true;
        this.grabEmail(function (data) {
          this.data = data;
          this.email = data.email;
          this.saveUser();
        }.bind(this));
      } else if (response.status === 'not_authorized') {
        console.log("not authorized");
      } else {
        console.log("user not logged into facebook");
      }
    },

    grabEmail: function (func) {
      FB.api('/me', func);
    },

    saveUser: function () {
      $.getJSON('/api/service', {
        name: 'user.save',
        params: {
          fbId: this.fbId,
          accessToken: this.accessToken,
          email: this.email
        }
      }, function (e) {
        this.id = e.result.id;
      }.bind(this));
    }
  });

  user = new UserModel();

  var OfferModel = Backbone.Model.extend({
    url: '/test',
    initialize: function () {
    },

    createOffer: function () {
      $.getJSON('/api/service', {
        name: 'offer.create',
        params: {
          userId: this.get('userId'),
          dept: this.get('dept'),
          course: this.get('course'),
          title: this.get('title'),
          price: this.get('price'),
          loc: this.get('loc'),
          author: this.get('author'),
          edition: this.get('edition'),
          fulfilled: this.get('fulfilled'),
          condition: this.get('condition')
        }
      }, function (e) {
        console.log(e);
      });
    }
  });

  offer = new OfferModel({
    userId: 10,
    dept: "EDU",
    course: "140AC",
    title: "Pedagogy",
    price: "20",
    loc: "South Side",
    author: "Dickens",
    edition: "2",
    fulfilled: false,
    condition: "decent"
  });

  var OfferCollection = Backbone.Collection.extend({
    model: OfferModel,
    url: '/api/service'
  });

  offers = new OfferCollection();

  Backbone.sync = function(method, model) {
    console.log(method + ': ' + method.url);
  };


})();
