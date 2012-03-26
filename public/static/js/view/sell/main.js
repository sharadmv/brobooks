define([
  'jQuery',
  'Underscore',
  'Backbone',
  'text!template/sell/main.html'
], function($, _, Backbone, sellMainTemplate) {
  var SellMainTemplate = Backbone.View.extend({
    el: $('#content'),
    render: function() {
      var data = {};
      var compiledTemplate = _.template(sellMainTemplate, data);
      this.$el.html(compiledTemplate);
    }
  });
  return new SellMainTemplate;
});
