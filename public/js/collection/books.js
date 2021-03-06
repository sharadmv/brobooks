define([
    'jQuery',
    'Underscore',
    'Backbone',
    'model/book',
    'view/buy/book'
], function($, _, Backbone, bookModel, bookView) {
  var BookCollection = Backbone.Collection.extend({
      model:bookModel,
      initialize:function(){
        var that = this;
        this.bind('add',function(model){
          view = new bookView({model:model});
          $("#buy-book, #sell-book").append(view.render().el);
        });
      },
      clear:function(){
        _.each(this.models,function(model){
          model.destroy();
        });
        $("#buy-book, #sell-book").html("");
      },
      getBookFromTitle: function(bookTitle) {
        for( var x in this.models) {
          if( this.models[x].get('title') == _.escape(bookTitle)) {
            return this.models[x].attributes;
          }
        }
        console.log("Unable to find isbn for title: " + bookTitle);
        return null
      }
  });

  return new BookCollection;
});
