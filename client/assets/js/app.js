(function() {
  'use strict';

  var app = angular.module('application', [
    'ui.router',
    'ngAnimate',
    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations',
    'ngMap',
    'ngFacebook'
  ])
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider', '$facebookProvider'];

  function config($urlProvider, $locationProvider, $facebookProvider) {
    $urlProvider.otherwise('/');

    $facebookProvider.setAppId(171410539870355);

    $facebookProvider.setPermissions("email");
    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

  }

/** Ordinal Filter for Numbers **/
app.filter('ordinal', function() {
  return function(input) {
    var s=["th","st","nd","rd"],
    v=input%100;
    return input+(s[(v-20)%10]||s[v]||s[0]);
  }
});

/** URL Encode FIlter **/
app.filter('urlencode', function() {
  return window.encodeURIComponent;
});



//include flow as a dependancy
// Documentation for the flow.js library   ----- https://github.com/flowjs/ng-flow
//angular.module('app', ['flow'])

})(); 