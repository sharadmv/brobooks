define([
    'jQuery',
    'Underscore',
    'Backbone',
    'jQueryUI',
    'text!template/sell/main.html',
    'collection/lectures',
    'collection/books',
    'model/user',
], function($, _, Backbone, jQueryUI, sellMainTemplate, lectureCollection, bookCollection, user) {
  var SellMainView = Backbone.View.extend({
      el: $('#content'),
      events: {
        'click #submit-offer': 'submitOffer'
      },
      render: function() {
        var data = {};
        var compiledTemplate = _.template(sellMainTemplate, data);
        this.$el.html(compiledTemplate);
        $( "#sell-class-select" ).autocomplete({
            source: function( request, response ) {
              $.ajax({
                  url: "http://23.21.101.110/api/service",
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
              var temp = ui.item.value.split(" ");
              var name = temp.splice(0,temp.length-1).join(" ");
              var num = temp[temp.length-1];
              $.ajax({
                url: 'http://23.21.101.110/api/service', 
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
                  console.log("Success!");
                  lectureCollection.clear();
                  _.each(obj.result.lec, function(lec){
                    lectureCollection.add(lec);
                  });
                  _.each(obj.result.slf, function(lec){
                    lectureCollection.add(lec);
                  });
                  _.each(obj.result.sem, function(lec){
                    lectureCollection.add(lec);
                  });
                  $("#sell-lecture").change(function(e) {console.log("In here");console.log(e.target.value); x = e;});
                }
              });
            },
            minLength: 1,
        });
      },
      submitOffer: function() {
        $.getJSON( '/api/service', {
          name: 'offer.create',
          params: {
            user: user.attributes.auth.user,
            book: bookCollection.getBookFromTitle($("#sell-book").val()),
            condition: $("#sell-condition").val(),
            price: $("#sell-price").val(),
            time: $("#sell-time").val(),
            loc: $("#sell-location").val()
          }
        }, function(e) {
          console.log(e);
        });
      },
      
  });

  return new SellMainView;
});
