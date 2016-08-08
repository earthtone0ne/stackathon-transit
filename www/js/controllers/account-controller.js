app.controller('AccountCtrl', function($scope, $ionicPopup) {
  $scope.settings = {
    alarm: true
  };
  $scope.user = {username: 'Stephanie', password: '123' }

  $scope.login = function(){
    if ($scope.user.username === $scope.login.username &&
        $scope.user.password === $scope.login.password){
      $scope.loggedInUser = $scope.user;
    }
    else {
      $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    }
  }
  $scope.logout = function(){
    $scope.loggedInUser = null;
    $scope.login.password = null;
  }

});
