define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!template/buy/lecture.html',
    'collection/books',
], function($, _, Backbone, buyLectureTemplate, bookCollection) {
  var BuyLectureView = Backbone.View.extend({
    tagName:'option',
    template:_.template(buyLectureTemplate),
    render: function() {
      var that = this;
      $("#buy-lecture, #sell-lecture").change( function(e){
        if (e.target.value == that.model.attributes.course) {
          that.getBook();
        }
      });
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    getBook:function(){
      $.getJSON('http://23.21.101.110/api/service?callback=?',{name:'scraper.book',params:{
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
