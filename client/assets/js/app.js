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
    'sticky',
  ])
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
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