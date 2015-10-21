//Handles Search Result Actions
angular.module('application').controller('dashController', ['$scope', 'dataHandler', '$state','$filter', function($scope, dataHandler, $state, $filter) {

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
