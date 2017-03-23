app.controller('DashCtrl', function($scope, DashFactory) {
  $scope.busRoutes = initialRouteSeeder();
  $scope.alarmingTime = 4;
  $scope.stopId = null;

  $scope.getEtaData = function() {
    return DashFactory.getEtaData($scope.route.num,$scope.stopId, $scope.selectedDir)
    .then(function(results){
      $scope.etas = results;
      $scope.etas.nextEta = results.reduce(function(prior,curr){
        if (curr.toLowerCase() === 'approaching') {return 0;}
        else {return Math.min(prior, curr);}
      },$scope.alarmingTime+1);
      if($scope.etas.length && $scope.etas.nextEta <= $scope.alarmingTime){
        let minUnit = DashFactory.getEtaUnit($scope.etas.nextEta);
        alert(`Next bus in ${$scope.etas.nextEta}${minUnit}!`);
      }
    })
    .catch(function(err){console.log(JSON.stringify(err));});
  };

  $scope.getDirs = function() {
    return DashFactory.getDirs($scope.route.num, $scope.selectedDir)
    .then(function(result){
      $scope.dirs=result.dirs;
      $scope.stops=result.stops[0];
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
    $scope.stops = null;
    $scope.stopId = null;
    $scope.etas = null;
    $scope.getDirs();
  };
  $scope.stopSelected= function(stop){
    if (!stop) {return;}
    $scope.selectedStop = stop;
    $scope.stopId=stop.id;
    $scope.getEtaData($scope.route, $scope.stopId, $scope.selectedDir);
  }

});
