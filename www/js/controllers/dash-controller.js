app.controller('DashCtrl', function($scope,DashFactory,$http) {
  $scope.busRoutes = initialRouteSeeder();
  $scope.greet = 'Welcome!!';
  $scope.alarmingTime = 10;
  // $scope.nextEta = $scope.alarmingTime +1;
  $scope.route = 190;  $scope.stop = 27270;
  $scope.getNJTdata = function() {
    return DashFactory.getNJTdata($scope.route,$scope.stop)
    .then(function(results){
      $scope.etas = results;
      $scope.nextEta = results.reduce(function(prior,curr){
        if (isNaN(+curr)) {return 0}
        else return Math.min(prior, curr)
      },$scope.alarmingTime+1);
      if($scope.nextEta <= $scope.alarmingTime){
      alert('Run for it!\nNext bus in '+ $scope.nextEta + ' minutes')
  }
    })
    .catch(function(err){console.log(JSON.stringify(err));});
  };

  $scope.getNJTdata();

// var url = '/apiNJT/getStopPredictionsETA.jsp?route=190&stop=26804';
})
