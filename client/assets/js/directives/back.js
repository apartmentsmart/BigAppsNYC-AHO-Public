angular.module('application').directive('back', function(){

  return{
    link: function(scope, element, attrs) {
         element.on('click', function() {
             window.history.back();
         });
     } 
  }

});