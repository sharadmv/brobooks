define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!template/buy/book.html',
    'app'
], function($, _, Backbone, buyBookTemplate, app) {
  var BuyBookView = Backbone.View.extend({
    tagName:'option',
    template:_.template(buyBookTemplate),
    render: function() {
      var that = this;
      $("#buy-book, #sell-book").change( function(e) {
        if( e.target.value != "Select a book") {
          $("#buy-book-group, #sell-book-group").addClass("success");
        } else {
          $("#buy-book-group, #sell-book-group").removeClass("success");
        };

        if( e.target.value == that.model.attributes.title) {
          that.getBook();
        }
      });
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    getBook:function(){
    }
  });
  return BuyBookView;
});
