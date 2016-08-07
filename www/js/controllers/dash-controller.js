app.controller('DashCtrl', function($scope,DashFactory,$http) {
  $scope.busRoutes = initialRouteSeeder();
  $scope.greet = 'Let\'s go bussin\'!';
  $scope.alarmingTime = 10;
  // $scope.nextEta = $scope.alarmingTime +1;
  $scope.stopId = null;

  $scope.getEtaData = function() {
    return DashFactory.getEtaData($scope.route.num,$scope.stopId)
    .then(function(results){
      $scope.etas = results;
      $scope.nextEta = results.reduce(function(prior,curr){
        if (isNaN(+curr)) {return 0;}
        else {return Math.min(prior, curr);}
      },$scope.alarmingTime+1);
      if($scope.nextEta <= $scope.alarmingTime){
        alert('Next bus in\n'+ $scope.nextEta + ' minutes');
      }
    })
    .catch(function(err){console.log(JSON.stringify(err));});
  };

  $scope.getDirs = function() {
    return DashFactory.getDirs($scope.route.num)
    .then(function(result){
      $scope.dirs=result.dirs;
      $scope.stops=result.stops[0];
      // console.log('ln 28, stops', $scope.stops[0]);
    })
    .catch(function(err){console.log(err);});
  };

  $scope.routeSelected= function(rte){
    $scope.route=rte;
    $scope.getDirs($scope.route.num);
    $scope.selectedDir = null;
    $scope.selectedStop = null;
  };
  $scope.dirSelected= function(dir){
    $scope.selectedDir=dir;
    $scope.selectedStop = null;
    $scope.getDirs($scope.route.num, dir);
  };
  $scope.stopSelected= function(stop){
    console.log('stop picked', stop.name, stop.id)
    $scope.selectedStop = stop;
    $scope.stopId=stop.id;
    $scope.getEtaData($scope.route, $scope.stopId)
  }
// var url = '/apiNJT/getStopPredictionsETA.jsp?route=190&stop=26804';
});
