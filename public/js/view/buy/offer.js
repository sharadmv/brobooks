define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!template/buy/offer.html',
], function($, _, Backbone, buyOfferTemplate) {
  var BuyOfferView = Backbone.View.extend({
    tagName:'tr',
    template:_.template(buyOfferTemplate),
    initialize: function() {
    },
    render: function() {
      that = this;
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.click(function() {
        $("#buy-offer-body .tr").removeClass("selected-offer");
        that.$el.addClass("selected-offer");
        that.model.set("selected", true);
        that.pickOffer(that.model)
      });
      return this;
    },
    pickOffer: function(offer) {
      $.getJSON("/api/service", {
        name: "location.find",
        params: {
          general: this.model.get("loc")
        }
      }, function(e) {
        $("#buy-loc-specific").html("");
        _.each(e.result, function(loc) {
          $("#buy-loc-specific").append("<option>" + loc.specific + "</option>");
        });
      });

        
      $("#collapseThree").collapse("show");
    }
  });
  return BuyOfferView;
});
