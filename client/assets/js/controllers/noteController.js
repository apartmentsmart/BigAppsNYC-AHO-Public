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
				$scope.note.user_id = $scope.account.id;

				if($state.params.id)
					$scope.note.listing_id = $state.params.id;

				dataService.async(noteEndpoint, $scope.note).then(function(r){

					if(r){
						if(!r.applied_on){
							r.applied_on = new Date();
						}
						else
							r.applied_on = $scope.convertDate(r.applied_on)

						$scope.note = r;
					}
					

				});
					

	    });

	}

	$scope.saveNote = function(){

		console.log($scope.note);

		var endpoint = "http://api.affordablehousingonline.com/nyc/push/?type=note";

	    dataService.push(endpoint, $scope.note).then(function(d){

	      	console.log(d);

	    })


	}


  $scope.convertDate = function (stringDate){
    stringDate = stringDate.replace(' ', 'T');
    var dateOut = new Date(stringDate);
    dateOut.setDate(dateOut.getDate());
    return dateOut;
  }

  $scope.formatDate = function(stringDate){

  	var date = new Date($scope.convertDate(stringDate));
	var monthNames = [
	  "January", "February", "March",
	  "April", "May", "June", "July",
	  "August", "September", "October",
	  "November", "December"
	];

	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();


	return monthNames[monthIndex] + " " + day + ', ' + year;
  }


}]);