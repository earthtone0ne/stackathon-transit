angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,DashFactory) {
  $scope.yeh = "Yeh!!";
  $scope.getNJTdata = function(route, stop) {
    DashFactory.getNJTdata(route, stop)
    .then(function (data) {
      $scope.otherYeh = data;
    });
  };
  $scope.getNJTdata(190,27175);
})
.factory('DashFactory', function($http){
  return {
    getNJTdata: function(route, stop){
      return route + ' ' + stop;
    }
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
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
