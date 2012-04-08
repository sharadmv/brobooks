define([
  'jQuery',
  'Underscore',
  'Backbone',
  'fb'
], function($, _, Backbone, FBAuth) {
  var userModel = Backbone.Model.extend({
    initialize: function() {
    },

    triggerAuth: function(callback) {
      // if user authenticated already, then call callback

      if( this.get("auth").authed) {
        return;
      }
      window.x = FBAuth;
      $(".fb_button").click();
      FB.Event.subscribe('auth.login', FBAuth.onLoginStatus(function() {
        $("#pickBook").click();
      }));
    }
  });

  user = new userModel({auth: FBAuth});
  x = user;
  return user;
});
