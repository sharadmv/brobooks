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
              console.log("SELECTED: "+ui.item);
              var temp = ui.item.split(" ");
              var name = temp.splice(0,temp.length-1).join(" ");
              var num = temp[temp.length-1];
              $.getJSON('/api/service',{name:'scraper.course',params:{year:'2012',term:'fall',name:name,num:num}},function(obj){
                console.log(obj);
              });
            },
            minLength: 2,
        });
      }
  });
  return new BuyMainView;
});
