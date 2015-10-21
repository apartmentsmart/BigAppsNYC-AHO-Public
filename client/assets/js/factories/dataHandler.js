angular.module('application').factory('dataHandler', ['$http', '$filter', 'globalFilter', '$sce', function($http, $filter, globalFilter, $sce){

      /*
        --Fetches, and optionally Filters, JSON object.
        --@scope is the current scope of the controller which needs to be passed in order to assign the return of $http call.
        --@scopeAtt is the attribute to assign the returned $http data to in the scope of the controller.
        --@scopeFilter is an optional object of key-value pairs. If passed only data that matches the conditions will be returned to the controller.
      */
      function fetch(scope, scopeAtt, scopeFilter){


        if(scopeFilter.type == 'search'){
          var endpoint = "http://api.affordablehousingonline.com/nyc/search";
            
            if(scopeFilter.borough)
              endpoint = endpoint+"/"+scopeFilter.borough;
        }
        else if(scopeFilter.type == 'notifications' && scopeFilter.user){
          var endpoint = "http://api.affordablehousingonline.com/nyc/notification/by-user";
            
            if(scopeFilter.user)
              endpoint = endpoint+"/"+scopeFilter.user+"/";

        }
        else{ 
          
          var endpoint = "http://api.affordablehousingonline.com/nyc/listing"

            if(scopeFilter.hud_id)
                endpoint = endpoint+"/"+scopeFilter.hud_id+"/";
        
        }



      if(endpoint){
      $http({
        url: endpoint, 
        method: "GET",
        params: scopeFilter
      }).success(function (data) {  
          //console.log(endpoint);
         // console.log(data);
          //trust and bind html
          if(data[0].affordability)
            data[0].affordability = $sce.trustAsHtml(data[0].affordability);


            if(data)
              scope[scopeAtt] = data; 


        });
    }
    }

    /*
      --Creates a new record.
      --@scope is the current scope of the controller which needs to be passed in order to assign the return of $http call.
      --@scopeAtt is the attribute to assign the returned $http data to in the scope of the controller.
      --@data is a key value pair set of data to post
    */
    function create(scope, scopeAtt, data){

        $http.post("http://api.affordablehousingonline.com/nyc/push/?type="+scopeAtt, data).success(function(data, status) {

            scope[scopeAtt] = data;
            
        })

    }

      return{
        fetch: fetch,
        create: create
      }
       

}]);
