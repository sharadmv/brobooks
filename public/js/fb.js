define(['jQuery'], function($) {
  var FBAuth = { 
    authed: false,
    accessToken: undefined,
    /** 
    * When someone has authed in, this creates a new user and saves it 
    */
    onFbConnected : function(response, onSuccess) {
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
              onSuccess();
            } else {
              // login with brobooks failed
            }
          }
        });
      });
    },

    onLoginStatus : function(response, onSuccess) {
      if( response.status === "connected") {
        onFbLogin(response, onSuccess);
      } else if (response.status === "not_authorized") {
        FBAuth.authed = false;
      } else {
        // they are not logged into facebook
      }
    }
  };


  window.fbAsyncInit = function() {
    FB.init({
      appId      : '305320992851654',
      status     : true, 
      cookie     : true,
      xfbml      : true,
      oauth      : true,
    });
    FB.getLoginStatus( FBAuth.onLoginStatus);
  };
  (function(d){
    var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    d.getElementsByTagName('head')[0].appendChild(js);
  }(document));
  return FBAuth;
});
