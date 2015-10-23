//Handles Search Result Actions
angular.module('application').controller('dashController', ['$scope','dataService','$state','$filter','globalFilter', function($scope,dataService, $state, $filter, globalFilter) {

  //Init Notifications Object
  $scope.notifications = {};

    // if(globalFilter.get('fbResponse').id){
        var fbresponse = {id:10206105901941465}
        // var fbresponse = globalFilter.get('fbResponse');
    

    var accountEndpoint =  "http://api.affordablehousingonline.com/nyc/user/"+fbresponse.id+"/";

    dataService.async(accountEndpoint).then(function(d){
      
      $scope.account = d[0];
      $scope.search = { borough:$scope.account.borough, hhsize:$scope.account.hhsize,disabilityStatus:"None", housingChoiceScore:0,age:$scope.account.age, income:$scope.account.income };
    
      // var endpoint = "http://api.affordablehousingonline.com/nyc/notification/by-user/"+$scope.account.id+"/";

      /////////////////////////////////////////////////////////////////////////////////////////
      //For Testing Purposes - Chris's User Account with Facebook
      var endpoint = "http://api.affordablehousingonline.com/nyc/notification/by-user/"+45+"/";
      /////////////////////////////////////////////////////////////////////////////////////////


      console.log(endpoint);
      dataService.async(endpoint).then(function(r){
        console.log(r);
        $scope.notifications = r;

      });

    });

// }




  //Method to Dismiss or Archive Notifications
  $scope.handleNotification = function(params){


    var thisNotification = $filter('filter')($scope.notifications,{'id':params.id})[0];
    
    thisNotification[params.action]= 1;
    thisNotification[params.action+"_on"] = new Date();



  }


}]);
