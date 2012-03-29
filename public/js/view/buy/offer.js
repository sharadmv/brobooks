define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!template/buy/offer.html',
], function($, _, Backbone, buyOfferTemplate) {
  var BuyOfferView = Backbone.View.extend({
    tagName:'tr',
    template:_.template(buyOfferTemplate),
    render: function() {
      var that = this;
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
  return BuyOfferView;
});
