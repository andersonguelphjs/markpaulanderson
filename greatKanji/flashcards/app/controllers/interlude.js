flashApp.controller('interludeCtrl', ['$scope', '$http', '$templateCache', '$window', '$timeout', 'level', 'animationTest', 'sharedProperties', function($scope, $http, $templateCache, $window, $timeout, level, animationTest, sharedProperties) {

  //sharedProperties.setObjectValue("level", 2);
  $scope.levelMsg = "Level " + sharedProperties.getObjectValue().level;

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

  $scope.createSprite = function() {
    var sprite = $scope.data[Math.floor(Math.random() * $scope.data.length)];
    var animatedPattern;
    // var rotation = {currentAngle:0,angleFunction:Math.floor(Math.random() * (5 * Math.random() < 0.5 ? 1 : -1))};
    var random = Math.random();

    if (random < 0.5) { //random single path
      animatedPattern = [{
        "patternLength": 1000,
        "patternAngle": Math.floor(Math.random() * 360),
        "speed": Math.floor(Math.random() * 5),
        "startx": 0,
        "starty": 0,
        "isRandom": false,
        "isWrap": Math.random() < 0.5 ? false : true
      }];
    } else { //random pattern
      animatedPattern = [{
        "patternLength": Math.floor(Math.random() * 50),
        "patternAngle": Math.floor(Math.random() * 360),
        "speed": Math.floor(Math.random() * 5),
        "startx": 0,
        "starty": 0,
        "isRandom": true,
        "isWrap": Math.random() < 0.5 ? false : true
      }];
    }
    // animatedPattern = [{"patternLength":Math.floor(Math.random()*50),"patternAngle":Math.floor(Math.random()*360),"speed":Math.floor(Math.random()*10),"startx":0,"starty":0, "isRandom":true}];
    // animatedPattern = [{"patternLength":150,"patternAngle":0,"speed":5,"startx":0,"starty":0, "isRandom":true},{"patternLength":100,"patternAngle":135,"speed":5},{"patternLength":100,"patternAngle":225,"speed":5}];
    animationTest.spawnCoin(sprite, animatedPattern, Math.random() < 0.5 ? {
      currentAngle: 0,
      angleFunction: Math.floor(Math.random() * (5 * Math.random() < 0.5 ? 1 : -1))
    } : null);
  };

  $scope.showAnimation = function() {
    // animatedPattern = [{"patternLength":Math.floor(Math.random()*50),"patternAngle":Math.floor(Math.random()*360),"speed":Math.floor(Math.random()*10),"startx":0,"starty":0, "isRandom":true}];
    // animatedPattern = [{"patternLength":150,"patternAngle":0,"speed":5,"startx":0,"starty":0, "isRandom":true},{"patternLength":100,"patternAngle":135,"speed":5},{"patternLength":100,"patternAngle":225,"speed":5}];
    $scope.createSprite();
    $scope.createSprite();
    $scope.createSprite();
    $timeout(function() {
      $window.location = "/greatKanji/flashcards/views/#mainView";
    }, 5000);

  };

}]);
