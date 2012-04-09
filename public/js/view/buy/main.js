define([
  'jQuery',
  'Underscore',
  'Backbone',
  'jQueryUI',
  'text!template/buy/main.html',
  'collection/lectures',
  'collection/books',
  'model/user',
  'collection/offers',

], function($, _, Backbone, jQueryUI, buyMainTemplate, lectureCollection, bookCollection, user, offerCollection) {
  var BuyMainView = Backbone.View.extend({
    el: $('#content'),
    events: {
      'click #pickBook': 'pickBook',
      'click #buy-offer': 'pickOffer',
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
              $("#buy-class-group").addClass("success");
              lectureCollection.clear();
              lectureCollection.add({course: "Select a lecture"});
              _.each(obj.result.lec, function(lec){
                lectureCollection.add(lec);
              });
              _.each(obj.result.slf, function(lec){
                lectureCollection.add(lec);
              });
              _.each(obj.result.sem, function(lec){
                lectureCollection.add(lec);
              });
            }
          });
        },
        minLength: 1,
      });
    },
    pickBook: function() {
      var bookTitle = $("#buy-book").val();
      var book = bookCollection.getBookFromTitle(bookTitle);
      console.log("Hi");
      if( book === null) {
        console.log("A book has not been chosen");
        $("#buy-book-group").addClass("error");
        return;
      }
      console.log(user);
      if( !user.attributes.auth.authed ) {
        user.triggerAuth(this.pickBook);
        return;
      }
      $("#buy-offer-loading").css("visibility", "visible");

      $.getJSON( '/api/service', {
        name: 'request.find',
        params: {
          book: book,
          user: user.attributes.auth.user
        }
      }, function(e) {
        $("#buy-offer-loading").css("visibility", "hidden");
        offerCollection.clear();
        console.log(e.result.length);
        if( e.result.length != 0) {
          for( var i in e.result) {
            var offer = e.result[i];
            offerCollection.add(offer);
          }
          $("#collapseOne").collapse("hide");
          $("#collapseTwo").collapse("show");
        }
      });
    },
    pickOffer: function() {
      var time = $("#buy-time").val();
      if( time == null || time == "") {
        $("#buy-time-group").addClass("error");
        return;
      }
      var loc = $("#buy-loc-specific").val();
      if( loc == null || loc == "") {
        $("#buy-loc-group").addClass("error");
        return;
      }
      var offer = offerCollection.getSelectedOffer();
      $("#buy-request-loading").css("visibility", "visible");
      $.getJSON( '/api/service', {
        name: 'request.fulfill',
        params: {
          user: user.attributes.auth.user,
          loc: loc,
          time: time,
          offer: offer
        }
      }, function(e) {
        $("#buy-request-loading").css("visibility", "hidden");
        if( e.status == "success") {
          message = "Success! You will receive an email shortly with  more details";
        } else {
          message = "Sorry, something went wrong with our servers, try again later";
        }
        $("#buy-message").html(message);
      });
    }
  });

  return new BuyMainView;
});
