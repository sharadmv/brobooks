define([
  'jQuery',
  'Underscore',
  'Backbone',
  'view/home/main',
  'view/buy/main'
], function($, _, Backbone, Session, mainView, buyView){
  var AppRouter = Backbone.Router.extend({
    routes : {
      // Define some URL routes
      '': 'renderHome',
      'home': 'renderHome',
      'buy': 'renderBuy',

      // Default
      '*actions': 'defaultAction'
    },
    renderHome: function(){
      mainView.render();
    },
    renderBuy: function(){
      buyView.render();
    },
    defaultAction: function(actions){
      // We have no matching route, lets just log what the URL was
      console.log('404 Page not found: ', actions);
    }


  });

  var initialize = function(){
    var app_router = new AppRouter;
    console.log("Initialized the router");
    console.log(Backbone.history);
    Backbone.history.start();
  };
  return { initialize: initialize };
});
