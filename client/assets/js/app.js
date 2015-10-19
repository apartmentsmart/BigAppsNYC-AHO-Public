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

app.directive('back', function(){

  return{
    link: function(scope, element, attrs) {
         element.on('click', function() {
             window.history.back();
         });
     } 
  }

});


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

/**
  -- Sets, Gets, and Mutates cross-controller search filter data.
**/
app.factory('globalFilter', function() {
 var savedData = {}
 
 function set(data) {
   savedData = data;
   localStorage.setItem('searchParameters', JSON.stringify(data));
 }
 
 function get() {
  return savedData;
 }

 function mutate(scope){
  
  if(scope.thisSearch.age >= 55){
      scope.thisSearch.elderly = 1;
  }

  delete scope.thisSearch.age;


  if(scope.thisSearch.disabilityStatus != "None")
      scope.thisSearch.disabled = 1;

  delete scope.thisSearch.disabilityStatus;

 }

 return {
  set: set,
  get: get,
  mutate: mutate
 }

});

app.factory('dataHandler', ['$http', '$filter', 'globalFilter', '$sce', function($http, $filter, globalFilter, $sce){

      /*
        --Fetches, and optionally Filters, JSON object.
        --@scope is the current scope of the controller which needs to be passed in order to assign the return of $http call.
        --@scopeAtt is the attribute to assign the returned $http data to in the scope of the controller.
        --@scopeFilter is an optional object of key-value pairs. If passed only data that matches the conditions will be returned to the controller.
      */
      function fetch(scope, scopeAtt, scopeFilter){


        if(scopeFilter.type == 'search'){
          var endpoint = "http://api.affordablehousingonline.com/nyc/search";
            
            if(scopeFilter.borough)
              endpoint = endpoint+"/"+scopeFilter.borough;
        }
        else if(scopeFilter.type == 'notifications' && scopeFilter.user){
          var endpoint = "http://api.affordablehousingonline.com/nyc/notification/by-user";
            
            if(scopeFilter.user)
              endpoint = endpoint+"/"+scopeFilter.user+"/";

        }
        else{ 
          
          var endpoint = "http://api.affordablehousingonline.com/nyc/listing"

            if(scopeFilter.hud_id)
                endpoint = endpoint+"/"+scopeFilter.hud_id+"/";
        
        }



      if(endpoint){
      $http({
        url: endpoint, 
        method: "GET",
        params: scopeFilter
      }).success(function (data) {  
          //console.log(endpoint);
         // console.log(data);
          //trust and bind html
          if(data[0].affordability)
            data[0].affordability = $sce.trustAsHtml(data[0].affordability);


            if(data)
              scope[scopeAtt] = data; 


        });
    }
    }

    /*
      --Creates a new record.
      --@scope is the current scope of the controller which needs to be passed in order to assign the return of $http call.
      --@scopeAtt is the attribute to assign the returned $http data to in the scope of the controller.
      --@data is a key value pair set of data to post
    */
    function create(scope, scopeAtt, data){

        $http.post("http://api.affordablehousingonline.com/nyc/push/?type="+scopeAtt, data).success(function(data, status) {

            scope[scopeAtt] = data;
            
        })

    }

      return{
        fetch: fetch,
        create: create
      }
       

}]);



//Handles Searching Actions
app.controller('searchController', ['$scope', 'globalFilter', function($scope, globalFilter) {

  //set $scope.search default variable if $scope.search is not set
  (!$scope.search)
    $scope.search = { borough:"All", hhsize:1, disabilityStatus:"None", housingChoiceScore:0};

    localStorage.setItem('searchParameters', JSON.stringify($scope.search));

    //watch $scope.search attributes for change
    $scope.$watchGroup(['search.borough', 'search.hhsize', 'search.age', 'search.disabilityStatus', 'search.housingChoiceScore', 'search.income'], function(newValues, oldValues, scope){
    
        globalFilter.set($scope.search);

    });

}]);

//Handles Search Result Actions
app.controller('resultsController', ['$scope','globalFilter', 'dataHandler', '$state', function($scope, globalFilter, dataHandler, $state) {

  //Init Listings Object
  $scope.listings={};
  $scope.thisSearch = {};

  //Attempts to set Search Object With local storage
  $scope.thisSearch =  JSON.parse(localStorage.getItem('searchParameters'));


  //Attempts to set Search Object with global filter
  if(!$scope.thisSearch.borough)
    $scope.thisSearch = globalFilter.get();

  //Check for, and override with, URL Paramss
  if($state.params.borough)
      $scope.thisSearch.borough = $state.params.borough;


  $scope.thisSearch.type = 'search';


   //Handle search param mutation
   globalFilter.mutate($scope);

   

  //Get data that matches the $scope.search object and assign it to $scope.listings
  dataHandler.fetch($scope, "listings", $scope.thisSearch);


}]);

//Handles Listing Actions
app.controller('listingController', ['$scope','globalFilter', 'dataHandler', '$state', '$location', '$anchorScroll', '$filter', function($scope, globalFilter, dataHandler, $state, $location, $anchorScroll, $filter) {


  //Init thisListing Object
  $scope.thisListing={};

  //Set Search Object based on $state.params
  $scope.search = {hud_id: $state.params.id};

  $scope.search.type='listing';

  //get data that matches the $scope.search object and assign it to $scope.thisListing;
  dataHandler.fetch($scope, "thisListing", $scope.search);

  //Set School Sort
  $scope.schoolSortType= 'distance';
  $scope.schoolSortReverse = false;

  //Set Map View
  $scope.mapView = 0;
  $scope.showSchools = 0;

  //Scroll To Function
  $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
  }

  //Get Map Object and Set Toggle Schools to False on init.
  $scope.$on('mapInitialized', function(evt, evtMap) {
            $scope.map = evtMap;
            $scope.toggleSchools(false);

            $scope.map.setZoom(16);
            var center = $scope.map.getCenter();
            google.maps.event.addListener( $scope.map, "idle", function(){

            google.maps.event.trigger( $scope.map, 'resize');
        

            });
            $scope.map.setCenter(center); 

  });




  //Turn on or off the school marker layer
  $scope.toggleSchools = function(sv){

  $scope.showSchools = sv;

    if(sv === true){

        angular.forEach($scope.map.markers, function(m,k){

            if(k != 'listingMarker')
                m.setMap($scope.map);
        
        });

    }
    
    else{
        
        angular.forEach($scope.map.markers, function(m, k){
        
            if(k != 'listingMarker')
                m.setMap(null);

        })



    }
  }

  //Toggle on or off full screen map
  $scope.toggleFullMap = function(mv){
        
      $scope.mapView = mv;

      var center = $scope.map.getCenter();
      
      $scope.map.setZoom(16);
      
      google.maps.event.addListener( $scope.map, "idle", function(){

              google.maps.event.trigger( $scope.map, 'resize');
      });

       $scope.map.setCenter(center); 
  };

  //show school info window
  $scope.showSchool = function(evt) {
      
      if($scope.infoWindow)
          $scope.infoWindow.close();
    

      $scope.school = $filter('filter')($scope.thisListing[0].schools, {'gsId':this.id});

      var marker = this;
      var map = $scope.map;


      $scope.infoWindow = new google.maps.InfoWindow({
        content: $scope.school[0].name
      });

      $scope.infoWindow.open(map, marker); 
  };

  $scope.newReview = {'user_id':1, 'listing_id':$state.params.id};
  
  $scope.submitReview = function(){


    dataHandler.create($scope.thisListing[0], 'reviews', $scope.newReview);
    $scope.hideReviewModal = 1;
    $scope.apply;
  }

  $scope.convertDate = function (stringDate){
    var dateOut = new Date(stringDate);
    dateOut.setDate(dateOut.getDate() + 1);
    return dateOut;
  }

}]);


//Handles Search Result Actions
app.controller('dashController', ['$scope', 'dataHandler', '$state','$filter', function($scope, dataHandler, $state, $filter) {

  //Init Notifications Object
  $scope.notifications = {};
  $scope.thisSearch = {};


  $scope.thisSearch.type = 'notifications';
  $scope.thisSearch.user = 1;

  //Get data that matches the $scope.search object and assign it to $scope.notifications
  dataHandler.fetch($scope, "notifications", $scope.thisSearch);

  //Method to Dismiss or Archive Notifications
  $scope.handleNotification = function(params){


    var thisNotification = $filter('filter')($scope.notifications,{'id':params.id})[0];
    
    thisNotification[params.action]= 1;
    thisNotification[params.action+"_on"] = new Date();



  }


}]);


/**
 **Directive to dynamically add click functions to buttons.
 **Currently used exclusively to direct and dismiss notifications.
 ****
 **Returns a button template and assigns the ng-click attribute to be handled by the link function(actionHandler), 
 **and associates the button display text as dictated by the $scope.notifications model.
 **"uiaction" is for any click function that would in normal circumstances use ui-sref. 
 **"controllerParams" and "controllerFunction" handle any click function from a controller.
 **/
app.directive('actionButton', ['$location', function(location) {
    return {
        restrict: 'E',
        replace: true,
        scope: {controllerParams: '@', uiAction: '@', actionText: '@', controllerFunction: '='},
        template: function(tElement, tAttrs) {
            return '<button class="button dark" ng-click="actionHandler()"  actionText="{{actionText}}">{{actionText}}</button>';
        },
        transclude: true,
        link: function(scope, element, attrs) {
            
            scope.actionHandler = function() {
                
                if(attrs.uiaction){
                  location.url(attrs.uiaction);
                }
                else if(attrs.controllerFunction && attrs.controllerParams){
                  var params = eval(attrs.controllerParams);
                  scope.controllerFunction(params);
                }
            
            };
        }
    };
}]);



//include flow as a dependancy
// Documentation for the flow.js library   ----- https://github.com/flowjs/ng-flow
angular.module('app', ['flow'])

})(); 