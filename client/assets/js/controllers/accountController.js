angular.module('application').controller('accountController', ['$scope', '$facebook', '$location', 'dataService', 'globalFilter', function($scope, $facebook, $location, dataService, globalFilter){

    if(globalFilter.get('fbResponse').id){
        
        var fbresponse = globalFilter.get('fbResponse');
      
        var endpoint = "http://api.affordablehousingonline.com/nyc/user/"+fbresponse.id+"/";

        dataService.async(endpoint, fbresponse).then(function(r){

            if(r[0].id > 0){
         
                $scope.account = r[0];

              var notificationEndpoint = "http://api.affordablehousingonline.com/nyc/notification/by-user/"+$scope.account.id+"/";

              dataService.async(notificationEndpoint).then(function(n){

                  if(n[0].id > 0){
               
                      $scope.account.notifications = n;
                
                  }

                })

            }

        });
        


    }

    $scope.altLogin = false;

    $scope.welcomeMsg = "Log In Or Register with Facebook";

    $scope.login = function() {
      $facebook.login().then(function() {
        refresh();
      });
    }

    function refresh() {
    $facebook.api("/me").then( 
      function(response) {
        
        $scope.response = response;
        
        globalFilter.set($scope.response, 'fbResponse');
   
        var endpoint = "http://api.affordablehousingonline.com/nyc/user/"+$scope.response.id+"/";

        dataService.async(endpoint, $scope.response).then(function(r){
            if(r[0].id > 0){
                $scope.account = r[0];
                $location.path('/profile');
            
            }
        });

     



      },
      function(err) {
        $scope.welcomeMsg = "Please Log In";
      });
    }

    $scope.update = function(){



      dataService.push("http://api.affordablehousingonline.com/nyc/push/?type=user", $scope.account).then(function(r){
        $scope.account = r[0];
      console.log($scope.account)

      });

    }

}]);
