$( function() {

  _.templateSettings = {
    interpolate: /\<\@\=(.+?)\@\>/g,
    evluate: /\<\@(.+?)\@\>/g
  }
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'projects': 'showProjects',
      'users': 'showUsers',

      // Default
      '*actions': 'defaultAction'
    },
    showProjects: function(){
      // Call render on the module we loaded in via the dependency array

      // 'views/projects/list'
      console.log("In show projects");
    },
    // As above, call render on our loaded module
    // 'views/users/list'
    showUsers: function(){
      console.log("In show users");
    },
    defaultAction: function(actions){
      // We have no matching route, lets display the home page 
      console.log("Default");
    }
  });

  var app_router = new AppRouter;
  Backbone.history.start();

}())
