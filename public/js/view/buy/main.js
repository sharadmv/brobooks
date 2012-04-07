define([
  'jQuery',
  'Underscore',
  'Backbone',
  'jQueryUI',
  'text!template/buy/main.html',
  'collection/lectures',
  'collection/books',
  'model/user',
  'collection/offers'
], function($, _, Backbone, jQueryUI, buyMainTemplate, lectureCollection, bookCollection, user, offerCollection) {
  var BuyMainView = Backbone.View.extend({
    el: $('#content'),
    events: {
      'click #pickBook': 'pickBook'
    },
    render: function() {
      var data = {};
      var compiledTemplate = _.template(buyMainTemplate, data);
      this.$el.html(compiledTemplate);
      $("#menu-buy").addClass("activated");
      $( "#buy-class-select" ).autocomplete({
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

              //$("#buy-lecture").change(function(e) {console.log("In here");console.log(e.target.value); x = e;});
            }
          });
        },
        minLength: 1,
      });
    },
    pickBook: function() {
      var bookTitle = $("#buy-book").val();
      var book = bookCollection.getBookFromTitle(bookTitle);
      $.getJSON( '/api/service', {
        name: 'request.find',
        params: {
          book: book,
          user: user.attributes.auth.user
        }
      }, function(e) {
        console.log(e);
        offerCollection.clear();
        _.each(e.result, function(offer) {
          offerCollection.add(offer);
        });
      });
    }
  });

  return new BuyMainView;
});
