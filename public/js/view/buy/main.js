define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!template/buy/main.html'
], function($, _, Backbone, buyMainTemplate) {
  var BuyMainView = Backbone.View.extend({
      el: $('#content'),
      render: function() {
        var data = {};
        var compiledTemplate = _.template(buyMainTemplate, data);
        this.$el.html(compiledTemplate);
        $( "#buy-lecture-select" ).autocomplete({
            source: function( request, response ) {
              $.ajax({
                  url: "/api/service",
                  dataType: "jsonp",
                  data: {
                    name:'scraper.catalog',
                    params:{
                      name:request.term 
                    }
                  },
                  success: function(message) {
                    if (message.code == 200) {
                      response($.map(message.result, function(item) {
                        return item;
                        })
                      );
                    }
                  }
              });
            },
            minLength: 2,
        });
      }
  });
  return new BuyMainView;
});
