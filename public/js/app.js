/**
 * Specifies the requirements of this class
 */
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
  /* '$' used for debugging */
  window.$ = $;



  return {initialize: init};
});
