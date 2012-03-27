define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!template/buy/lecture.html',
    'collection/lectures'
], function($, _, Backbone, buyLectureTemplate, lectureCollection) {
  var BuyLectureView = Backbone.View.extend({
    initialize: function() {
      this.collection = lectureCollection;
    },

    el: $('#buy-lecture'),
    render: function() {
      var lectures = [];
      _.each(this.collection.models, function(course) {lectures.push(course.attributes.course);});
      var data = {lectures: lectures};
      var compiledTemplate = _.template(buyLectureTemplate, data);
      $('#buy-lecture').html(compiledTemplate);
    },

    update: function(lectures) {
      var that = this;
      this.collection.models = [];
      _.each(lectures, function(lecture) {that.collection.add(lecture)});
      this.render();
    }
  });
  return new BuyLectureView;
});
