define([
  'jQuery',
  'Underscore',
  'Backbone',
  'router'
], function($, _, Backbone, Router) {

  var init = function() {
    Router.initialize();
  }

  return {initialize: init};
});
