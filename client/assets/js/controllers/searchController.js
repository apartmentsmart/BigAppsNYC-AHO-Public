//Handles Searching Actions
angular.module('application').controller('searchController', ['$scope', 'globalFilter', 'dataService', function($scope, globalFilter, dataService) {

	    if(globalFilter.get('fbResponse').id){
        		var fbresponse = globalFilter.get('fbResponse');
        

        var accountEndpoint =  "http://api.affordablehousingonline.com/nyc/user/"+fbresponse.id+"/";

        dataService.async(accountEndpoint).then(function(d){
    			$scope.account = d[0];
    			$scope.search = { borough:$scope.account.borough, hhsize:$scope.account.hhsize,disabilityStatus:"None", housingChoiceScore:0,age:$scope.account.age, income:$scope.account.income };
        });

        }

  //set $scope.search default variable if $scope.search is not set
  (!$scope.search)
    $scope.search = { borough:"All", hhsize:1, disabilityStatus:"None", housingChoiceScore:0};

    localStorage.setItem('searchParameters', JSON.stringify($scope.search));

    //watch $scope.search attributes for change
    $scope.$watchGroup(['search.borough', 'search.hhsize', 'search.age', 'search.disabilityStatus', 'search.housingChoiceScore', 'search.income'], function(newValues, oldValues, scope){
    
        globalFilter.set($scope.search);

    });
   	
   	
    $scope.urlEncode = function(string){
    string = string.replace(/ /g, '-');
    return string;
    };

}]);