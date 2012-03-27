define([
    'jQuery',
    'Underscore',
    'Backbone',
    'jQueryUI',
    'text!template/buy/main.html',
    'collection/lectures',
], function($, _, Backbone, jQueryUI, buyMainTemplate, lectureCollection) {
  var BuyMainView = Backbone.View.extend({
      el: $('#content'),
      render: function() {
        var data = {};
        var compiledTemplate = _.template(buyMainTemplate, data);
        this.$el.html(compiledTemplate);
        $( "#buy-class-select" ).autocomplete({
            source: function( request, response ) {
              $.ajax({
                  url: "http://brobooks.com/api/service",
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
              console.log("SELECTED: "+JSON.stringify(ui.item));
              var temp = ui.item.value.split(" ");
              var name = temp.splice(0,temp.length-1).join(" ");
              var num = temp[temp.length-1];
              $.ajax({
                url: 'http://brobooks.com/api/service', 
                dataType: "jsonp", 
                data: {
                  name:'scraper.course',
                  params: {
                    year:'2012',
                    term:'spring',
                    name:name,num:num
                  }
                },
                success: function(obj){
                  lectureCollection.clear();
                  _.each(obj.result.lec, function(lec){
                    lectureCollection.add(lec);
                  });
                }
              });
            },
            minLength: 1,
        });
      }
  });
  return new BuyMainView;
});
