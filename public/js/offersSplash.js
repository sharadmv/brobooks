var onFbLogin;

(function () {

  var UserModel = Backbone.Model.extend({
    initialize: function () {
      this.loggedIn = false;
      onFbLogin = this.onFbLogin.bind(this);
    },

    onLogin: function () {
      window.location.replace("/offers?userId=" + this.id);
    },

    onFbLogin: function (response) {
      if (response.status === 'connected') {
        this.fbId = response.authResponse.userID;
        this.accessToken = response.authResponse.accessToken;
        this.loggedIn = true;
        this.grabEmail(function (data) {
          this.data = data;
          this.name = data.name;
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
      $.getJSON('/user/save', {
        fbId: this.fbId,
        accessToken: this.accessToken,
        email: this.email,
        name: this.name
      }, function (e) {
        this.id = e.id;
        $("#user-input").val(this.id);
        this.onLogin();
      }.bind(this));
    }
  });

  user = new UserModel();
})();
