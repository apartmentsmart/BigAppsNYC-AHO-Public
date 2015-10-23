//Handles Search Result Actions
angular.module('application').controller('resultsController', ['$scope','globalFilter', 'dataHandler', '$state', 'dataService', function($scope, globalFilter, dataHandler, $state, dataService) {

  //Init Listings Object
  $scope.listings={};
  $scope.thisSearch = {};

  //Attempts to set Search Object With local storage
  $scope.thisSearch =  JSON.parse(localStorage.getItem('searchParameters'));


  //Attempts to set Search Object with global filter
  if(!$scope.thisSearch.borough)
    $scope.thisSearch = globalFilter.get();

  //Check for, and override with, URL Params
  if($state.params.borough)
      $scope.thisSearch.borough = $state.params.borough;

    var ami_band = {};
    ami_band[1] = {50:'30250',60:'36300', 80:'48400' };
    ami_band[2] = {50:'34550',60:'41460', 80:'55300' };
    ami_band[3] = {50:'38850',60:'46620', 80:'62150'};
    ami_band[4] = {50:'43150',60:'51780', 80:'69050'};
 

  if($scope.thisSearch.hhsize && $scope.thisSearch.income){
   var hh_size = ($scope.thisSearch.hhsize > 4 ? 4 : $scope.thisSearch.hhsize);
   var band_by_size = ami_band[hh_size];

   var income = $scope.thisSearch.income * 12;

   if(income < band_by_size[50])
     $scope.thisSearch.ami_band = 49;

  else if(income < band_by_size[60])
     $scope.thisSearch.ami_band = 59;

   else if(income < band_by_size[80])
     $scope.thisSearch.ami_band = 79;
   
   else
      $scope.thisSearch.ami_band = 81;

  }
 
  var endpoint = "http://api.affordablehousingonline.com/nyc/search";
      
      if($scope.thisSearch.borough)
        endpoint = endpoint+"/"+$scope.thisSearch.borough;


   //Handle search param mutation
   globalFilter.mutate($scope);

    dataService.async(endpoint, $scope.thisSearch).then(function(results){

      $scope.listings = results;

    }) 


    $scope.urlEncode = function(string){
    string = string.replace(/ /g, '-');
    return string;
    };


}]);
