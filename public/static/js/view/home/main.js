define([
  'jQuery',
  'Underscore',
  'Backbone',
  'text!template/home/main.html'
], function($, _, Backbone, homeHappyTemplate) {
  var HomeHappyView = Backbone.View.extend({
    el: $('#container'),
    render: function() {
      var data = {};
      var compiledTemplate = _.template(homeHappyTemplate, data);
      this.$el.append(compiledTemplate);
    }
  });
  return new HomeHappyView;
});
