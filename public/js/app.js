define([
  'jQuery',
  'Underscore',
  'Backbone',
  'router',
  'model/user'
], function($, _, Backbone, Router, user) {

  var init = function() {
    Router.initialize();
  };
  window.$ = $;



  return {initialize: init};
});
