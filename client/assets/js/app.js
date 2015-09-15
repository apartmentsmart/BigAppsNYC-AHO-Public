(function() {
  'use strict';

  var app = angular.module('application', [
    'ui.router',
    'ngAnimate',
    'ngRoute',
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

app.factory('filterState', function() {
 var savedData = {}
 function set(data) {
   savedData = data;
 }
 function get() {
  return savedData;
 }

 return {
  set: set,
  get: get
 }

});

//Search Controller Working Protoype
app.controller('searchController', ['$scope', 'filterState', function($scope, filterState) {
      

      //set $scope.search default variable if $scope.search is not set
      (!$scope.search)
        $scope.search = { borough:"All", sizeOfHousehold:2, disabilityStatus:"None"};
       
      
        //watch $scope.search attributes for change
        $scope.$watchGroup(['search.borough', 'search.sizeOfHousehold'], function(newValues, oldValues, scope){

            filterState.set($scope.search);
            console.log(filterState.get());
            console.log('!!');
        
        });




}]);

app.controller('resultsController', ['$scope','$http','$filter','$routeParams','filterState', '$state', function($scope, $http, $filter, $routeParams, filterState, $state) {

             //Init Listings Object
       $scope.listings = [];
       $scope.search = filterState.get();

       if(!$scope.search.borough)
        $scope.search = $state.params;

      console.log($scope.search);


       //Call local demo JSON
       $http.get("/data/nycdemodata.json").success(function (data, status, headers, config) {
          
          //On Success set listings object equal to json return
          $scope.listings = data;
          if($scope.search)          
            $scope.filteredResults = filterSearch();
          else
            $scope.filteredResults = "No Filter";

         }).error(function (data, status, headers, config) {
           //on Error log error status
           console.log(status)
           $scope.listings = "error";
       });

      function filterSearch(){  

        return $filter('filter')($scope.listings, {borough: $scope.search.borough});
        
      }

}]);

})(); 