/**
  -- Sets, Gets, and Mutates cross-controller search filter data.
**/
angular.module('application').factory('globalFilter', function() {
 var savedData = {}
 
 function set(data, localStorageParam) {
   savedData = data;
   var thisLocalStorageParam = (localStorageParam ? localStorageParam : 'searchParameters');
   localStorage.setItem(thisLocalStorageParam, JSON.stringify(data));
 }
 
 function get(localStorageParam) {
  return (localStorage.getItem(localStorageParam) ? JSON.parse(localStorage.getItem(localStorageParam)) : savedData);
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