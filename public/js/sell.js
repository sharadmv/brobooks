var onFbLogin;
var validate;

(function () {

  var UserModel = Backbone.Model.extend({
    initialize: function () {
      this.loggedIn = false;
      onFbLogin = this.onFbLogin.bind(this);
    },

    onLogin: function () {
      $(".fb-stuff").html("Welcome " + this.name.split(" ")[0] + "!");
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
        console.log(e);
        this.id = e.id;
        console.log(this.id);
        $("#user-input").val(this.id);
        console.log("here");
        this.onLogin();
      }.bind(this));
    }
  });

  validate = function () {
    var inputs = ["user", "course", "title", "author", "edition", "price", "condition", "loc", "time"];
    for (var i = 0; i < inputs.length; i++) {
      var input = $("#" + inputs[i] + "-input");
      var control = input.parent().parent();
      if (inputs[i] === "price") {
        control = control.parent();
      }
      if (input.val() === "") {
        control.addClass("error");
        return false;
      } else {
        control.removeClass("error");
      }
    }

    return true;
  };



  user = new UserModel();
})();
