//Handles Listing Actions
angular.module('application').controller('listingController', ['$scope','globalFilter', '$state', '$location', '$anchorScroll', '$filter', 'dataService', '$sce', 
  function($scope, globalFilter,$state, $location, $anchorScroll, $filter, dataService, $sce) {


  //Init thisListing Object
  $scope.thisListing={};

  //Set Search Object based on $state.params
  $scope.search = {hud_id: $state.params.id};

  //API Endpoint The ID should always be present. If it's not..well..you will not have a very good page.
  var endpoint = "http://api.affordablehousingonline.com/nyc/listing/"+$scope.search.hud_id+"/";

  dataService.async(endpoint).then(function(d){

      if(d[0].affordability)
        d[0].affordability = $sce.trustAsHtml(d[0].affordability);

      $scope.thisListing = d;

      console.log($scope.thisListing)


  });


  //Set School Sort
  $scope.schoolSortType= 'distance';
  $scope.schoolSortReverse = false;

  //Set Map View
  $scope.mapView = 0;
  $scope.showSchools = 0;



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

    var endpoint = "http://api.affordablehousingonline.com/nyc/push/?type=reviews";

    dataService.push(endpoint, $scope.newReview).then(function(d){

      $scope.thisListing[0].reviews = d;

    })

    $scope.hideReviewModal = 1;
    $scope.apply;
  }

  $scope.convertDate = function (stringDate){
    var dateOut = new Date(stringDate);
    dateOut.setDate(dateOut.getDate() + 1);
    return dateOut;
  }
  
  //Should be a directive
 $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
  }

}]);
