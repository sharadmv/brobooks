define([
  'jQuery',
  'Underscore',
  'Backbone',
  'fb'
], function($, _, Backbone, FBAuth) {
  var userModel = Backbone.Model.extend({
    initialize: function() {
    }
  });

  user = new userModel({auth: FBAuth});
  x = user;
  return user;
});
