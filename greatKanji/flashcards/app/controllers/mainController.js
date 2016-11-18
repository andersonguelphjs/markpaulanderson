

flashApp.controller('mainCtrl', ['$scope', '$http', '$templateCache', '$interval', '$timeout', 'animationTest',function($scope, $http, $templateCache, $interval, $timeout, animationTest) {

$(document).ready(function(){
$scope.progressBar = $("#myProgressBar");
  $('.stayPressed .btn').not('.clearButton').click(function(e) {

        $(this).addClass('active');
  });
  $('.stayPressed .clearButton').click(function(e) {

        $('.stayPressed .btn').removeClass('active');
  });
});
//animationTest.sayGoodbye();

animationTest.init("myAnimations");
console.log($scope.fromService);
  $scope.timeLeft = 1000;

  $scope.operation = "+";
  $scope.operationArray = [];
  $scope.minValue = 1;
  $scope.maxValue = 5;
  $scope.numQuestions = 10;
  $scope.operand1;
  $scope.operand2;
  $scope.answer;
  $scope.showAnswer = false;
  $scope.keyPressed = 13;
  $scope.method = 'GET';
  $scope.url = '../app/json/sprites.json';
  $scope.status = "s";
  $scope.data = "d";

  $http({
    method: $scope.method,
    url: $scope.url,
    cache: $templateCache
  }).
  then(function(response) {
    $scope.status = response.status;
    $scope.data = response.data;
    console.dir($scope.data[0]);

  }, function(response) {
    $scope.data = response.data || 'Request failed';
    $scope.status = response.status;
  });


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

  //  $scope.iBack="url('images/gohan.png') 0 0";
  $scope.startProgressBar = function(){

  $scope.progressBar.css("width","100%");
  if (!$scope.progressBar.is(":animated")){
  setTimeout(function(){

  $scope.progressBar.animate({width:0},5000, function(){

    $timeout(function() {
      $scope.$apply();
    }, 0);
    setTimeout(function(){
      $scope.setOperands();
    },1500);
  });

},500);
}
};

  $scope.setOperands = function() {
    console.log($scope.maxValue);
    $scope.operand1 = Math.floor(Math.random() * $scope.maxValue) + $scope.minValue;
    $scope.operand2 = Math.floor(Math.random() * $scope.maxValue) + $scope.minValue;

    var ops = $(".stayPressed .active");
    var opArr=[];

    $.each(ops, function(){
    opArr.push($(this).attr("data-sign"));
    });

    if (!opArr || opArr.length < 1){
      $scope.operation = "+";
    }
    else{
      $scope.operation = opArr[Math.floor((Math.random() * opArr.length))];
    }

    if ($scope.operation === "x"){
      $scope.answer = $scope.operand1 * $scope.operand2;
    }
    else if ($scope.operation === "-"){
      $scope.answer = $scope.operand1 - $scope.operand2;
    }
    else if ($scope.operation === "%"){
          $scope.answer = $scope.operand1 / $scope.operand2;
    }
    else{
    $scope.answer = $scope.operand1 + $scope.operand2;

    }
    $timeout(function() {
      $scope.showAnswer=false;
      $scope.$apply();

      $scope.startProgressBar();
    }, 0);


  }
  $scope.setOperands();

  angular.element(window).bind('keypress', function(e) {
//e.keycode
    $scope.keyPressed = Number(e.which);
    console.log("$scope.keyPressed "+Number(e.which));
    if ($scope.keyPressed === 110) {

      if (!$scope.progressBar.is(":animated")) {
       $scope.setOperands();
        $scope.showAnswer = false;
      } else {

        $scope.progressBar.stop(true);
        $scope.showAnswer = true;
        $timeout(function() {
        //  $scope.showAnswer=false;
          $scope.$apply();
        //  $scope.startProgressBar();
        }, 0);
      }
    //  animationTest.spawnCoin("../app/images/catWalking.png",4800,200,12,5);
    animationTest.spawnCoin($scope.data[Math.floor(Math.random() * $scope.data.length)]);
    }

    $scope.keyPressed = null;
  });
}]);
