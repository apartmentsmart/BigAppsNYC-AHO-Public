(function() {
  'use strict';

  var app = angular.module('application', [
    'ui.router',
    'ngAnimate',
    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
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

/**
  -- Sets, Gets, and Mutates cross-controller search filter data.
**/
app.factory('globalFilter', function() {
 var savedData = {}
 
 function set(data) {
   savedData = data;
 }
 
 function get() {
  return savedData;
 }

 function mutate(scope){


  if(scope.thisSearch.borough == 'All')
      delete scope.thisSearch.borough; 
  
  if(scope.thisSearch.age >= 55){
      scope.thisSearch.elderly = 1;
  }

  delete scope.thisSearch.age;


  if(scope.thisSearch.disabilityStatus != "None")
      scope.thisSearch.disabled = 1;

  delete scope.thisSearch.disabilityStatus;

  delete scope.thisSearch.sizeOfHousehold;


 }

 return {
  set: set,
  get: get,
  mutate: mutate
 }

});

app.factory('dataHandler', ['$http', '$filter', function($http, $filter){

      /*
        --Fetches, and optionally Filters, JSON object.
        --@scope is the current scope of the controller which needs to be passed in order to assign the return of $http call.
        --@scopeAtt is the attribute to assign the returned $http data to in the scope of the controller.
        --@scopeFilter is an optional object of key-value pairs. If passed only data that matches the conditions will be returned to the controller.
      */
      function fetch(scope, scopeAtt, scopeFilter){
       $http.get("/data/nycdemodata.json")
       .success(function (data) {  
          
          scope[scopeAtt]= data; 
          
          if(scopeFilter){ 
               scope[scopeAtt] = filter( scope[scopeAtt], scopeFilter);
          }

        })
        
        .error(function (error) { 

             scope[scopeAtt] = error; });;
        
        }


      /*
       --Filters JSON object if called by Fetch.
       --@data a JSON object
       --@filter is an object of key-value pairs. Data that matches the conditions will be returned to the controller.
      */
      function filter(data, filter){
       return $filter('filter')(data, filter);
      }


      return{
        fetch: fetch,
        filter: filter
      }

}]);

//Handles Searching Actions
app.controller('searchController', ['$scope', 'globalFilter', function($scope, globalFilter) {

  //set $scope.search default variable if $scope.search is not set
  (!$scope.search)
    $scope.search = { borough:"All", sizeOfHousehold:1, disabilityStatus:"None"};


  //watch $scope.search attributes for change
  $scope.$watchGroup(['search.borough', 'search.sizeOfHousehold'], function(newValues, oldValues, scope){
    

    /**
      TODO: Handle all search param modulation here BEFORE handed off to any other controller..
    **/


    globalFilter.set($scope.search);
  });

}]);

//Handles Search Result Actions
app.controller('resultsController', ['$scope','globalFilter', 'dataHandler', '$state', function($scope, globalFilter, dataHandler, $state) {

  //Init Listings Object
  $scope.listings={};

  //Attempts to set Search Object
  $scope.thisSearch = globalFilter.get();

  //If no Search Object, set to URL params.
  if(!$scope.thisSearch.borough)
    $scope.thisSearch = $state.params;




   //Handle search param mutation
   globalFilter.mutate($scope);

   

  //Get data that matches the $scope.search object and assign it to $scope.listings
  dataHandler.fetch($scope, "listings", $scope.thisSearch);


}]);

//Handles Listing Actions
app.controller('listingController', ['$scope','globalFilter', 'dataHandler', '$state', function($scope, globalFilter, dataHandler, $state) {

  //Init thisListing Object
  $scope.thisListing={};

  //Set Search Object based on $state.params
  $scope.search = {hud_id: $state.params.id};

  //get data that matches the $scope.search object and assign it to $scope.thisListing;
  dataHandler.fetch($scope, "thisListing", $scope.search);

}]);

app.controller('listingController', ['$scope', '$http', '$filter', 'filterState', '$state', function($scope, $http, $filter, filterState, $state){


           //Call local demo JSON
     $http.get("/data/nycdemodata.json").success(function (data, status, headers, config) {
        
      console.log(data);

        //On Success set listings object equal to json return
        $scope.listings = data;
        
        $scope.thisListing = $filter('filter')($scope.listings, {hud_id: $state.params.id});


        console.log($scope.thisListing);

       }).error(function (data, status, headers, config) {
         //on Error log error status
         console.log(status)
         $scope.listings = "error";
     });




}]);

})(); 