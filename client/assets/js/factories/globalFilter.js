/**
  -- Sets, Gets, and Mutates cross-controller search filter data.
**/
angular.module('application').factory('globalFilter', function() {
 var savedData = {}
 
 function set(data) {
   savedData = data;
   localStorage.setItem('searchParameters', JSON.stringify(data));
 }
 
 function get() {
  return savedData;
 }

 function mutate(scope){
  
  if(scope.thisSearch.age >= 55){
      scope.thisSearch.elderly = 1;
  }

  delete scope.thisSearch.age;


  if(scope.thisSearch.disabilityStatus != "None")
      scope.thisSearch.disabled = 1;

  delete scope.thisSearch.disabilityStatus;

 }

 return {
  set: set,
  get: get,
  mutate: mutate
 }

});