define([
  'Underscore',
  'Backbone',
  'model/lecture'
], function(_, Backbone, lectureModel) {
  var LectureCollection = Backbone.Collection.extend({
    model: lectureModel,

  });

  return new LectureCollection;
});
