define([
  'jQuery',
  'Underscore',
  'Backbone',
  'text!template/about/main.html'
], function($, _, Backbone, aboutMainTemplate) {
  var AboutMainView = Backbone.View.extend({
    el: $('#content'),
    render: function() {
      var data = {};
      var compiledTemplate = _.template(aboutMainTemplate, data);
      this.$el.html(compiledTemplate);
    }
  });
  return new AboutMainView;
});
