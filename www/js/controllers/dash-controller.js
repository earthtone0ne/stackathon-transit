app.controller('DashCtrl', function($scope,DashFactory) {
  $scope.busRoutes = initialRouteSeeder();
  $scope.cache={};
  $scope.alarmingTime = 10;
  // $scope.nextEta = $scope.alarmingTime +1;
  $scope.stopId = null;

  $scope.getEtaData = function() {
    $scope.cacheTheStops($scope.route.num,$scope.stopId);
    return DashFactory.getEtaData($scope.route.num,$scope.stopId)
    .then(function(results){
      $scope.etas = results;
      $scope.etas.nextEta = results.reduce(function(prior,curr){
        if (isNaN(+curr)) {return 0;}
        else {return Math.min(prior, curr);}
      },$scope.alarmingTime+1);
      if($scope.etas.nextEta <= $scope.alarmingTime){
        alert('Next bus in\n'+ $scope.etas.nextEta + ' minutes');
      }
    })
    .catch(function(err){console.log(JSON.stringify(err));});
  };

  $scope.getDirs = function() {
    if($scope.cache[$scope.route.num]){
      $scope.dirs= $scope.cache[$scope.route.num].dirs;
      $scope.stops= $scope.cache[$scope.route.num].stops[0];
      return true;
    } else {
        return DashFactory.getDirs($scope.route.num, $scope.selectedDir)
        .then(function(result){
          $scope.dirs=result.dirs;
          $scope.stops=result.stops[0];
          // $scope.cache[$scope.route.num].dirs= result.dirs;
        })
        .catch(function(err){console.log(err);});
    }
  };

  $scope.routeSelected= function(rte){
    $scope.route=rte;
    $scope.getDirs(); //$scope.route.num
    $scope.selectedDir = null;
    $scope.selectedStop = null;
    $scope.stopId= null;
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
    console.log('stop picked', stop.name, stop.id, 'dir:'+ $scope.selectedDir);
    $scope.selectedStop = stop;
    $scope.stopId=stop.id;
    $scope.getEtaData($scope.route, $scope.stopId);
  };

  $scope.stopEntered = function(){
    $scope.getEtaData(null,$scope.stopId).then(function(response){
      $scope.route=response.route;
    });

  }
  // if a cache exists, if either (1) both stops arrays already exist, or (2) the selected dir is the first (so the stops are already cached), then return. If no cache exists, this is the first dir, so create cache with stops[0].
  var cacheTheStops = function(twoDirs, stopsArr){
    var cachedRoute = $scope.cache[$scope.route.num];
    if (cachedRoute){
      if (!cachedRoute.stops[1] && !cachedRoute.dirs[0]===$scope.selectedDir ) {
        cachedRoute.stops[1] = stopsArr;
      }
    } else {
      $scope.cache[$scope.route.num] = {
        dirs: twoDirs,
        stops: [stopsArr]
      }
    }
    return cachedRoute;
  }
// var url = '/apiNJT/getStopPredictionsETA.jsp?route=190&stop=26804';
});
