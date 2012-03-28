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
  'order!jQuery',
  'order!Underscore',
  'order!Backbone',
  'app',
], function($,_,Backbone, App) {
  App.initialize();
});
