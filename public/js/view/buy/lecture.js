define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!template/buy/lecture.html',
    'collection/books'
], function($, _, Backbone, buyLectureTemplate, bookCollection) {
  var BuyLectureView = Backbone.View.extend({
      tagName:'label',
      template:_.template(buyLectureTemplate),
      events:{
        'click .buy-lecture-radio':'getBook' 
      },
      render: function() {
        console.log(this.model.toJSON());
        this.$el.html(this.template(this.model.toJSON()));
        return this;
      },
      getBook:function(){
        $.getJSON('http://www.brobooks.com/api/service?callback=?',{name:'scraper.book',params:{
              year:'2012',
              term:'spring',
              ccn:this.model.attributes.ccn
        }
        }, function(obj) {
          if (obj.result[0].author){
            bookCollection.clear();
            _.each(obj.result, function(book){
              bookCollection.add(book);
            });
          }
        });
      }
  });
  return BuyLectureView;
});
