define([
  'jQuery',
  'Underscore',
  'Backbone',
  'text!template/home/main.html'
], function($, _, Backbone, homeHappyTemplate) {
  var HomeHappyView = Backbone.View.extend({
    el: $('#content'),
    render: function() {
      var data = {x:5};
      var compiledTemplate = _.template(homeHappyTemplate, data);
      this.$el.html(compiledTemplate);
    }
  });
  console.log("In home template");
  return new HomeHappyView;
});
