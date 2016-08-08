app.controller('AddAlertCtrl', function($scope, AlertFactory, angularMoment) {
  // To listen for when this page is active (to refresh data instead of cache),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.time='7';
  $scope.alerts = AlertFactory.all();
  $scope.remove = function(alert) {
    AlertFactory.remove(alert);
  };
});


app.controller('AlertDetailCtrl', function($scope, $stateParams, AlertFactory) {
  $scope.alert = AlertFactory.get($stateParams.alertId);
})
