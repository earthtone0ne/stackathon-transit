app.controller('AddAlertCtrl', function($scope, Alert, moment) {
  // To listen for when this page is active (to refresh data instead of cache),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.time=moment();
  $scope.alerts = Alert.all();
  $scope.remove = function(Alert) {
    Alert.remove(Alert);
  };
});


app.controller('AlertDetailCtrl', function($scope, $stateParams, Alert) {
  $scope.Alert = Alerts.get($stateParams.alertId);
})
