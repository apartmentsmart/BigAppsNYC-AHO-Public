
/**
 **Directive to dynamically add click functions to buttons.
 **Currently used exclusively to direct and dismiss notifications.
 ****
 **Returns a button template and assigns the ng-click attribute to be handled by the link function(actionHandler), 
 **and associates the button display text as dictated by the $scope.notifications model.
 **"uiaction" is for any click function that would in normal circumstances use ui-sref. 
 **"controllerParams" and "controllerFunction" handle any click function from a controller.
 **/
angular.module('application').directive('actionButton', ['$location', function(location) {
    return {
        restrict: 'E',
        replace: true,
        scope: {controllerParams: '@', uiAction: '@', actionText: '@', controllerFunction: '='},
        template: function(tElement, tAttrs) {
            return '<button class="button dark" ng-click="actionHandler()"  actionText="{{actionText}}">{{actionText}}</button>';
        },
        transclude: true,
        link: function(scope, element, attrs) {
            
            scope.actionHandler = function() {
                
                if(attrs.uiaction){
                  location.url(attrs.uiaction);
                }
                else if(attrs.controllerFunction && attrs.controllerParams){
                  var params = eval(attrs.controllerParams);
                  scope.controllerFunction(params);
                }
            
            };
        }
    };
}]);