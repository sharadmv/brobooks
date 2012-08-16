var onFbLogin;
(function () {
  var user;


  var UserModel = Backbone.Model.extend({
    initialize: function () {
      this.loggedIn = false;
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
        this.id = e.result.user_id;
      }.bind(this));
    }
  });

  var user = new UserModel();
})();
