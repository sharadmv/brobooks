define([
  'jQuery',
  'Underscore',
  'Backbone',
  'router'
], function($, _, Backbone, Router) {

  var app = {
    initialize: function() {
      Router.initialize();
    },

    selectLecture: function(e) {
      console.log(e);
      }
  }



  return app;
});
