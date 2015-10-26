
/**
 **Directive to dynamically add click functions to buttons.
 **Currently used exclusively to direct and dismiss notifications.
 ****
 **Returns a button template and assigns the ng-click attribute to be handled by the link function(actionHandler), 
 **and associates the button display text as dictated by the $scope.notifications model.
 **"uiaction" is for any click function that would in normal circumstances use ui-sref. 
 **"controllerParams" and "controllerFunction" handle any click function from a controller.
 **/
angular.module('application').directive('favoriteButton', ['$location', 'dataService', 'globalFilter', function(location, dataService, globalFilter) {
    return {
        restrict: 'E',
        replace: true,
        scope: {listingId: '@'},
        template: function(tElement, tAttrs) {
            return '<li><div listingId="{{listingId}}" ng-click="favoriteHandler()"><i class="fa fa-heart-o"></i><br> Follow</div></li>';
        },
        transclude: true,
        link: function(scope, element, attrs) { 

            scope.favoriteHandler = function(){

                if(globalFilter.get('fbResponse').id){
                    
                    var fbresponse = globalFilter.get('fbResponse');

                    var accountEndpoint =  "http://api.affordablehousingonline.com/nyc/user/"+fbresponse.id+"/";

                        dataService.async(accountEndpoint).then(function(d){
                            
                            scope.account = d[0];
                            
                            var favoriteEndpoint = "http://api.affordablehousingonline.com/nyc/favorite/";


                            dataService.async(favoriteEndpoint, {user_id:scope.account.id, listing_id: attrs.listingid}).then(function(r){

                                

                            });                            
                    
                    });

                }

            }

        }
    }

    }]);