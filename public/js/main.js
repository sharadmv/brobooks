/**
 * A list of shortcut of template urls so that later on the full url is not necessary
 */
require.config({
  paths: {
    jQuery: 'lib/jquery/jquery',
    jQueryUI: 'lib/jquery/jquery-ui',
    Underscore: 'lib/underscore/underscore',
    Backbone: 'lib/backbone/backbone',
    // raw template files
    template: '../template'
  }
});



/** 
 * This handles all the javascript requirements and imports everything
 */
require([
  'app',
  'order!lib/jquery/jquery-min',
  'order!lib/underscore/underscore-min',
  'order!lib/backbone/backbone-min',
  'order!lib/misc/bootstrap-collapse',
  'order!lib/misc/bootstrap-tooltip',
  'order!lib/misc/bootstrap-popover',
], function(App) {
   App.initialize();
});
