//Handles Searching Actions
angular.module('application').controller('searchController', ['$scope', 'globalFilter', function($scope, globalFilter) {

  //set $scope.search default variable if $scope.search is not set
  (!$scope.search)
    $scope.search = { borough:"All", hhsize:1, disabilityStatus:"None", housingChoiceScore:0};

    localStorage.setItem('searchParameters', JSON.stringify($scope.search));

    //watch $scope.search attributes for change
    $scope.$watchGroup(['search.borough', 'search.hhsize', 'search.age', 'search.disabilityStatus', 'search.housingChoiceScore', 'search.income'], function(newValues, oldValues, scope){
    
        globalFilter.set($scope.search);

    });

}]);