define([
  'jQuery',
  'Underscore',
  'Backbone',
  'text!template/buy/main.html'
], function($, _, Backbone, buyMainTemplate) {
  var BuyMainView = Backbone.View.extend({
    el: $('#content'),
    render: function() {
      var data = {};
      var compiledTemplate = _.template(buyMainTemplate, data);
      this.$el.html(compiledTemplate);
    }
  });
  return new BuyMainView;
});
