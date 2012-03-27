define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!template/buy/book.html',
    'collection/books'
], function($, _, Backbone, buyBookTemplate) {
  var BuyBookView = Backbone.View.extend({
    tagName:'label',
    template:_.template(buyBookTemplate),
    events:{
      'click .buy-book-radio':'getBook' 
    },
    render: function() {
      console.log(this.model.toJSON());
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    getBook:function(){
      console.log(this.model);
    }
  });
  return BuyBookView;
});
