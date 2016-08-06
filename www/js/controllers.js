angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,DashFactory,$http) {
  $scope.yeh = 'Yeh!!';
  $scope.getNJTdata = function() {
    $scope.otherYeh = DashFactory.getNJTdata(190,27175);

  };

  var url = '/apiNJT/getStopPredictionsETA.jsp?route=190&stop=27175';
  $http.get(url)
    .then(function (response) {
      var parser = new DOMParser();
      var parsedRes = parser.parseFromString(response.data, "text/xml");
      var times = parsedRes.getElementsByTagName("pt");
      var text = parsedRes.getElementsByTagName("pu");
      var result =[];
      for (var i = 0; i<times.length; i++){
        if (isNaN(+times[i].innerHTML)){
          result.push(text[i].innerHTML)
        } else {
          result.push(times[i].innerHTML)
        }
      }
      $scope.otherYeh = result;
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

