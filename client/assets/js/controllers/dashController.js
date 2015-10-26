//Handles Search Result Actions
angular.module('application').controller('dashController', ['$scope','dataService','$state','$filter','globalFilter', function($scope,dataService, $state, $filter, globalFilter) {

  //Init Notifications Object
  $scope.notifications = {};

  $scope.dashView = 'notifications';


   if(globalFilter.get('fbResponse').id){
         var fbresponse = globalFilter.get('fbResponse');
    

    var accountEndpoint =  "http://api.affordablehousingonline.com/nyc/user/"+fbresponse.id+"/";

    dataService.async(accountEndpoint).then(function(d){
      
      $scope.account = d[0];
      $scope.search = { borough:$scope.account.borough, hhsize:$scope.account.hhsize,disabilityStatus:"None", housingChoiceScore:0,age:$scope.account.age, income:$scope.account.income };
    
      var notificationEndpoint = "http://api.affordablehousingonline.com/nyc/notification/by-user/"+$scope.account.id+"/";

      dataService.async(notificationEndpoint).then(function(r){
        if(r){
         $scope.notifications = r;
        }
        else{
          $scope.notifications = {};
        }
        

      });


      var noteEndpoint = "http://api.affordablehousingonline.com/nyc/note/";

        dataService.async(noteEndpoint, {user_id:$scope.account.id}).then(function(r){

          $scope.notes = r;

        });


      var favoriteEndpoint = "http://api.affordablehousingonline.com/nyc/favorite/";

        dataService.async(favoriteEndpoint, {user_id:$scope.account.id}).then(function(r){

          $scope.favorites = r;

        });

    });

 }




  //Method to Dismiss or Archive Notifications
  $scope.handleNotification = function(params){


    var thisNotification = $filter('filter')($scope.notifications,{'id':params.id})[0];
    
    thisNotification[params.action]= 1;
    thisNotification[params.action+"_on"] = new Date();



  }

  $scope.toggleDash = function(dashView){

    $scope.dashView = dashView;

  }

}]);
