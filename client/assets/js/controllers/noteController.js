//Handles Listing Actions
angular.module('application').controller('noteController', ['$scope','globalFilter','dataService', '$sce', '$state', 
  function($scope, globalFilter, dataService, $sce, $state) {

  	$scope.note = {};

    if(globalFilter.get('fbResponse').id){
		
		var fbresponse = globalFilter.get('fbResponse');


	    var accountEndpoint =  "http://api.affordablehousingonline.com/nyc/user/"+fbresponse.id+"/";

	    dataService.async(accountEndpoint).then(function(d){
				$scope.account = d[0];
	    		
				noteEndpoint = "http://api.affordablehousingonline.com/nyc/note/";
				$scope.note = {user:$scope.account.id,listing:$state.params.id}

				dataService.async(noteEndpoint, $scope.note).then(function(r){

					console.log(r)
					if(!r.applied_on){
						r.applied_on = new Date();
					}
					else
						r.applied_on = $scope.convertDate(r.applied_on)
					
					$scope.note = r;
					

				});
					

	    });

	}

	$scope.saveNote = function(){

		console.log($scope.note);

	}


  $scope.convertDate = function (stringDate){
    stringDate = stringDate.replace(' ', 'T');
    var dateOut = new Date(stringDate);
    dateOut.setDate(dateOut.getDate() + 1);
    return dateOut;
  }


}]);