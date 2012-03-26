define([
  'jQuery',
  'Underscore',
  'Backbone'
], function($,_, Backbone) {
  var bookModel = Backbone.Model.extend( {
    defaults: {
      name: "Harry Potter"
    }
  });
  return bookModel;
});
