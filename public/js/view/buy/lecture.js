define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!template/buy/lecture.html',
    'collection/lectures'
], function($, _, Backbone, buyLectureTemplate) {
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
        console.log(obj);
      });
    }
  });
  return BuyLectureView;
});
