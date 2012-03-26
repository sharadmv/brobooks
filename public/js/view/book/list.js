define([
  'jQuery',
  'Underscore',
  'Backbone',
  'collection/books',
  'text!template/book/list.html'
], function($, _, Backbone, bookCollection, bookListTemplate) {
  var bookListView = Backbone.View.extend({
    el: $("#container"),
    initialize: function() {
      this.collection = new bookCollection;
      this.collection.add({name: "blah"});
      var compiledTemplate = _.template(bookListTemplate, {books: this.collection.models});
      this.$el.html(compiledTemplate);
    }

  });
  return bookListView;

});
