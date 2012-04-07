require.config({
  paths: {
    jQuery: 'lib/jquery/jquery',
    jQueryUI: 'lib/jquery/jquery-ui',
    Underscore: 'lib/underscore/underscore',
    Backbone: 'lib/backbone/backbone',
    template: '../template'
  }

});



require([
  'app',
  'order!lib/jquery/jquery-min',
  'order!lib/underscore/underscore-min',
  'order!lib/backbone/backbone-min',
], function(App) {
   App.initialize();
});
