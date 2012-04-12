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
      this.bind('add',function(model){
        view = new offerView({model:model});
        $("#buy-offer-body").append(view.render().el);
      });

    },
    clear: function() {
      _.each(this.models, function(model) {
        model.destroy();
      });
      $("#buy-offer-body").html("");
    },
    getSelectedOffer: function() {
      for( var i in this.models) {
        var offer = this.models[i]
        x = offer;
        if( offer.attributes.selected) {
          return offer.attributes;
        }
      }
    }
  });

  return new OfferCollection;

});
