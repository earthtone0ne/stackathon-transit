app.controller('AddAlertCtrl', function($scope, AlertFactory, DashFactory, ClockSvc) {
  // To listen for when this page is active (to refresh data instead of cache),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.busRoutes = initialRouteSeeder();
  $scope.alerts = AlertFactory.all();
  $scope.addAlert = function(){
    return $scope.addMsg= "Added!"
  }
  $scope.remove = function(alert) {
    AlertFactory.remove(alert);
  };

// Display the month, day, and year.
  $scope.currDate=new Date();
  
});


app.controller('AlertDetailCtrl', function($scope, $stateParams, AlertFactory) {
  $scope.alert = AlertFactory.get($stateParams.alertId);
})

  // $scope.datetime = ClockSvc.getNow()
  // console.log('dt',$scope.datetime)
