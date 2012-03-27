define([
    'jQuery',
    'Underscore',
    'Backbone',
    'model/lecture',
    'view/buy/lecture'
], function($, _, Backbone, lectureModel, lectureView) {
  var LectureCollection = Backbone.Collection.extend({
      model:lectureModel,
      initialize:function(){
        var that = this;
        this.bind('add',function(model){
          view = new lectureView({model:model});
          $("#buy-lecture").append(view.render().el);
        });
      },
      clear:function(){
        _.each(this.models,function(model){
          model.destroy();
        });
        $("#buy-lecture").html("");
      }
  });

  return new LectureCollection;
});
