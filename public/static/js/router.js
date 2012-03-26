define([
  'jQuery',
  'Underscore',
  'Backbone',
  'view/home/main',
  'view/buy/main',
  'view/book/list'
], function($, _, Backbone, mainView, buyView, sellView, aboutView){
  var AppRouter = Backbone.Router.extend({
    routes : {
      // Define some URL routes
      '': 'renderHome',
      'home': 'renderHome',
      'buy': 'renderBuy',
      'sell': 'renderSell',
      'about': 'renderAbout',

      // Default
      '*actions': 'defaultAction'
    },
    renderHome: function(){
      mainView.render();
    },
    renderBuy: function(){
      buyView.render();
    },

    renderSell: function() {
      sellView.render();
    },

    renderAbout: function() {
      aboutView.render();
    },
    defaultAction: function(actions){
      // We have no matching route, lets just log what the URL was
      console.log('404 Page not found: ', actions);
    }


  });

  var initialize = function(){
    var app_router = new AppRouter;
    Backbone.history.start();
  };
  return { initialize: initialize };
});
