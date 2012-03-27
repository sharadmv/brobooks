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
          $("#buy-book").append(view.render().el);
        });
      },
      clear:function(){
        _.each(this.models,function(model){
          model.destroy();
        });
        $("#buy-book").html("");
      }
  });

  return new BookCollection;
});
