define([
  'jQuery',
  'Underscore',
  'Backbone',
  'model/offer',
  'view/buy/offer'
], function($, _, Backbone, offerModel, offerView) {
  var OfferCollection = Backbone.Collection.extend( {
    model: offerModel,
    initialize: function() {
      
    },
    clear: function() {
      _.each(this.models, function(model) {
        model.destroy();
      });
      $("#buy-offer-table").html("");
    },
  });

  return new OfferCollection;
    
});
