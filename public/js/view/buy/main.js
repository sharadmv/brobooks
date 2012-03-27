define([
    'jQuery',
    'Underscore',
    'Backbone',
    'jQueryUI',
    'text!template/buy/main.html',
], function($, _, Backbone, jQueryUI, buyMainTemplate) {
  var BuyMainView = Backbone.View.extend({
      el: $('#content'),
      render: function() {
        var data = {};
        var compiledTemplate = _.template(buyMainTemplate, data);
        this.$el.html(compiledTemplate);
        console.log("autocomplate");
        $( "#buy-class-select" ).autocomplete({
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
                      response($.map(message.result.splice(0,16), function(item) {
                        return item;
                        })
                      );
                    }
                  }
              });
            },
            select:function(event,ui){
              console.log("SELECTED");
            },
            minLength: 2,
        });
      }
  });
  return new BuyMainView;
});
