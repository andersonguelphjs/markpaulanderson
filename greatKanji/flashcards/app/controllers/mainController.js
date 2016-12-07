flashApp.controller('mainCtrl', ['$scope', '$http', '$templateCache', '$interval', '$timeout', 'animationTest', 'sharedProperties', function($scope, $http, $templateCache, $interval, $timeout, animationTest, sharedProperties) {

  $(document).ready(function() {

    $('.stayPressed .btn').not('.clearButton').click(function(e) {
      $(this).addClass('active');
    });

    $('.stayPressed .clearButton').click(function(e) {
      $('.stayPressed .btn').removeClass('active');
    });

  });
  //animationTest.sayGoodbye();

  animationTest.init("myAnimations");
  //console.log($scope.fromService);
  $scope.timeLeft = 1000;
  $scope.operation = "+";
  $scope.operationArray = [];
  $scope.minValue = 1;
  $scope.maxValue = 5;
  $scope.numQuestions = 10;
  $scope.operand1 = 0;
  $scope.operand2 = 0;
  $scope.answer = 0;
  $scope.showAnswer = false;
  $scope.keyPressed = 13;
  //$scope.method = 'GET';
  //$scope.url = '../app/json/sprites.json';
  //$scope.status = "s";
  //$scope.data = "d";
  $scope.timerOn = true;
  $scope.operand1Arr = [1];
  $scope.operand2Arr = [1];
  $scope.answerArr = [1];

  $scope.data = sharedProperties.getObjectValue().animatedData;
  $scope.staticImages = sharedProperties.getObjectValue().staticImages;

  /*
  $http({
    method: $scope.method,
    url: $scope.url,
    cache: $templateCache
  }).
  then(function(response) {
    $scope.status = response.status;
    $scope.data = response.data;
    $scope.staticImages = $.grep($scope.data, function(n, i) {
      return n.hasFirstFrame;
    });
    console.dir($scope.data[0]);
    $scope.setOperands();
  }, function(response) {
    $scope.data = response.data || 'Request failed';
    $scope.status = response.status;
  });
  */


  //to enable local http launch Chrome from terminal
  //open /Applications/Google\ Chrome.app --args --allow-file-access-from-files
  /*
  $http({
    method: $scope.method,
    url: $scope.url,
    cache: $templateCache
  }).
  then(function(response) {
    $scope.status = response.status;
    $scope.data = response.data;
    //$scope.showSprites($scope.data,1)
    $scope.iWidth = data.lengthPX;
    $scope.iHeight = data.depthPX;
    $scope.iBack = "url('" + $scope.data.url + "') " + $scope.iWidth + " " + $scope.iHeight;

  }, function(response) {
    $scope.data = response.data || 'Request failed';
    $scope.status = response.status;
  });
  */

  //show hide timer
  $scope.timerToggle = function() {

    $scope.timerOn = !$scope.timerOn;

    if (!$scope.timerOn) {
      $("#myProgressBar").animate().stop();
    }

  };

  // start the timer
  $scope.startProgressBar = function() {

    $("#myProgressBar").css("width", "100%");
    if (!$("#myProgressBar").is(":animated")) {

      setTimeout(function() {
        $("#myProgressBar").animate().stop();
        $("#myProgressBar").animate({
          width: 0
        }, 10000, function() {
          $scope.showAnswer = true;
          $timeout(function() {
            $scope.$apply();
          }, 0);
          setTimeout(function() {
            $scope.setOperands();
          }, 1500);
        });

      }, 500);
    }
  };

  $scope.setOperands = function() {
    //get random operands
    $scope.operand1 = Math.floor(Math.random() * $scope.maxValue) + $scope.minValue;
    $scope.operand2 = Math.floor(Math.random() * $scope.maxValue) + $scope.minValue;

    //choose a random image
    var staticImageIndex = Math.floor(Math.random() * $scope.staticImages.length);

    //to show the images beside the number
    $scope.outerStyle = {
      "max-width": $scope.staticImages[staticImageIndex].imgLength / $scope.staticImages[staticImageIndex].numFrames / 4 + "px",
      "max-height": $scope.staticImages[staticImageIndex].imgHeight / 4 + "px"
    };
    $scope.one1Style = {
      "width": $scope.staticImages[staticImageIndex].imgLength / 2,
      "height": $scope.staticImages[staticImageIndex].imgHeight / 2,
      "background": "url('" + $scope.staticImages[staticImageIndex].imageUrl + "')"
    };

    //what are the operations the user has chosen
    var ops = $(".stayPressed .active").not(".notOperation");
    var opArr = [];

    $.each(ops, function() {
      opArr.push($(this).attr("data-sign"));
    });

    //if nothing chosen, choose +, then do basic math
    if (!opArr || opArr.length < 1) {
      $scope.operation = "+";
    } else {
      $scope.operation = opArr[Math.floor((Math.random() * opArr.length))];
    }

    if ($scope.operation === "x") {
      $scope.answer = $scope.operand1 * $scope.operand2;
    } else if ($scope.operation === "-") {
      //lets make sure we dont have negative numbers
      if ($scope.operand1 < $scope.operand2) {
        var temp = $scope.operand1;
        $scope.operand1 = $scope.operand2;
        $scope.operand2 = temp;
      }
      $scope.answer = $scope.operand1 - $scope.operand2;
    } else if ($scope.operation === "%") {
      $scope.answer = $scope.operand1 / $scope.operand2;
    } else {
      $scope.answer = $scope.operand1 + $scope.operand2;
    }
    $scope.answerArr = new Array(Number($scope.answer));
    $scope.operand1Arr = new Array(Number($scope.operand1));
    $scope.operand2Arr = new Array(Number($scope.operand2));

    //now show it
    $timeout(function() {
      $scope.showAnswer = false;
      if ($scope.timerOn) {
        $scope.startProgressBar();
      }
    }, 0);
  };

//create teh sprite, generally of random types and behaviours
 $scope.createSprite = function(){
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
   animationTest.spawnCoin(sprite, animatedPattern, Math.random() < 0.5 ? {currentAngle:0,angleFunction:Math.floor(Math.random() * (5 * Math.random() < 0.5 ? 1 : -1))} : null);
 };

  angular.element(window).bind('keypress', function(e) {
    //e.keycode
    $scope.keyPressed = Number(e.which);
    //clicked 'N'
    if ($scope.keyPressed === 110) {
      $("#myProgressBar").animate().stop();
      if ($scope.showAnswer) {
        $scope.showAnswer = false;
        $scope.setOperands();
      } else {
        $scope.showAnswer = true;
        $scope.createSprite();
        $timeout(function() {}, 0);
      }
    }
    $scope.keyPressed = null;
  });

//start the program
  $scope.setOperands();

}]);
