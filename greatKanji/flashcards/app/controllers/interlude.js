flashApp.controller('interludeCtrl', ['$scope', '$http', '$templateCache', '$window', '$timeout', 'level', 'animationTest', 'sharedProperties', function($scope, $http, $templateCache, $window, $timeout, level, animationTest, sharedProperties) {

  //sharedProperties.setObjectValue("level", 2);
  $scope.level = sharedProperties.getObjectValue().level;
  $scope.levelMsg = "Level " + $scope.level;
  $scope.interlude = null;

  $scope.data = sharedProperties.getObjectValue().animatedData;
  animationTest.init("myAnimations");
  if (!$scope.data) { //we will cache the data once
    $scope.method = 'GET';
    $scope.animationUrl = '../app/json/sprites.json';
    $scope.interludesUrl = '../app/json/interludes.json';

    //variation 1

    $http({
      method: $scope.method,
      url: $scope.animationUrl,
      cache: $templateCache
    }).
    then(function(response) {
      $scope.data = response.data; //all the data
      $scope.staticImages = $.grep($scope.data, function(n, i) { //all images that we can use the first image
        return n.hasFirstFrame;
      });
      //cache the data
      sharedProperties.setObjectValue("animatedData", $scope.data);
      sharedProperties.setObjectValue("staticImages", $scope.staticImages);
      if ($scope.interludesData) {
        $scope.showAnimation();
      }
    });

    $http({
      method: $scope.method,
      url: $scope.interludesUrl,
      cache: $templateCache
    }).
    then(function(response) {
      $scope.interludesData = response.data; //all the data
      //cache the data
      sharedProperties.setObjectValue("interludesData", $scope.interludesData);
      if ($scope.data) {
        $scope.showAnimation();
      }
    });
  } else {
    $scope.showAnimation();
  }

  $scope.showAnimation = function() {

    $scope.interlude = $scope.interludesData[$scope.level-1];

    if ($scope.interlude.randomNumber > 0) {
       for (var i=0;i < $scope.interlude.randomNumber;i++){
         //$scope.createSprite();
         animationTest.spawnCoin();
       }
    }else if ($scope.interlude.interlude){
      for (var j=0;j < $scope.interlude.interlude.length;j++){
        animationTest.spawnCoin($scope.data[$scope.interlude.interlude[j][0].spriteIndex],$scope.interlude.interlude[j]);
      }
    }
    $timeout(function() {
     $window.location = "/greatKanji/flashcards/views/#mainView";
    }, 5000);

  };

}]);
