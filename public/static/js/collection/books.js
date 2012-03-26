define([
  'Underscore',
  'Backbone',
  'model/book'
], function(_, Backbone, bookModel) {
  var bookCollection = Backbone.Collection.extend({
    model: bookModel
  });

  return bookCollection;
});
