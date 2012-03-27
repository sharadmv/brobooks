define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!template/buy/lecture.html',
], function($, _, Backbone, jQueryUI, buyMainTemplate) {
  var BuyMainView = Backbone.View.extend({
      el: $('#lecture'),
      render: function() {
      }
  });
  return new BuyMainView;
});
