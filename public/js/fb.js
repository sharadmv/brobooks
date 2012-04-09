/**
 * This requires only jquery
 */
define(['jQuery'], function($) {

  /**
   * This is the shared FB Auth object which encapsulates all facebook authentication
   */
  var FBAuth = { 
    authed: false,
    accessToken: undefined,
    /** 
    * When someone has authed in, this creates a new user and saves it 
    */
    onFbConnected : function(response, onSuccess) {
      $("#menu-login").css("visibility: hidden;");
      FBAuth.FBId = response.authResponse.userID;
      FBAuth.accessToken = response.authResponse.accessToken;
      FBAuth.authed = true;
      FB.api('/me', function(e) {
        FBAuth.me = e;
        FBAuth.email = e.email;
        user = {name:FBAuth.me.name,email:e.email,token:FBAuth.accessToken,fbId:FBAuth.FBId};
        $.ajax({
          url: '/api/service', 
          dataType: "jsonp", 
          data: {
            name:'user.save',
            params: {
              user:user
            }
          },
          success: function(obj){
            if( obj.status === "success") {
              FBAuth.user = obj.result[0];
              if( typeof onSuccess === "function") {
                onSuccess();
              }
            } else {
              // login with brobooks failed
            }
          }
        });
      });
    },

    onLoginStatus : function(response, onSuccess) {
      console.log(response);
      if( response.status === "connected") {
        FBAuth.onFbConnected(response, onSuccess);
        console.log("The user is logged in already");
      } else if (response.status === "not_authorized") {
        FBAuth.authed = false;
        console.log("The user is not authorized");
      } else {
        // they are not logged into facebook
        console.log("The user is not logged into FB");
      }
    }
  };

  window.FBAuth = FBAuth;

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '305320992851654',
      status     : true, 
      cookie     : true,
      xfbml      : true,
      oauth      : true,
    });
    FB.getLoginStatus( FBAuth.onLoginStatus);
    FB.Event.subscribe('auth.login', FBAuth.onLoginStatus);
  };
  (function(d){
    var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    d.getElementsByTagName('head')[0].appendChild(js);
  }(document));
  return FBAuth;
});
