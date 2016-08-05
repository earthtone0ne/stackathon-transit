angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,DashFactory,$http) {
  $scope.yeh = 'Yeh!!';
  $scope.getNJTdata = function() {
    $scope.otherYeh = DashFactory.getNJTdata(190,27175);

  };

  var url = '/apiNJT/getStopPredictionsETA.jsp?route=190&stop=27175';
  $http.get(url)
    .then(function (data) {
      console.log('herebedata',data);
      $scope.otherYeh = data;
    })
    .catch(function(err){console.log(JSON.stringify(err));
    });

})

.factory('DashFactory', function($http){
  return {
    getNJTdata: function(route, stop){
      var url = '//mybusnow.njtransit.com/bustime/eta/getStopPredictionsETA.jsp?route='+route +'&stop=' + stop;
      $http.get(url)
      .then(function (data) {
        console.log('herebedata',data);
        return data;
      })
      .catch(function(err){console.log(JSON.stringify(err));});
    }
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // To listen for when this page is active (to refresh data instead of cache),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

