

flashApp.controller('mainCtrl', ['$scope', '$http', '$templateCache', '$interval', 'animationTest',function($scope, $http, $templateCache, $interval, animationTest) {

$(document).ready(function(){

  $('.stayPressed .btn').not('.clearButton').click(function(e) {

        $(this).addClass('active');
  });
  $('.stayPressed .clearButton').click(function(e) {

        $('.stayPressed .btn').removeClass('active');
  });
});
//animationTest.sayGoodbye();

animationTest.init();
console.log($scope.fromService);
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
  $scope.url = 'json/sprites.json';
  $scope.status = "s";
  $scope.data = "d";
  $scope.spriteLeft;
  $scope.spriteTop;
  $scope.iWidth = 50;
  $scope.iHeight = 50;
  $scope.iLeft = 50;
  $scope.iBack = "url('images/blackFireworks.jpg') 0 0";



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

  $scope.showSprites = function(data, index) {
    // Don't start a new fight if we are already fighting
    if (!data) return;
    var l = d = 0;
    $scope.iWidth = data.lengthPX;
    $scope.iHeight = data.depthPX;
    stop = $interval(function() {
      l++;
      l = l % data.length;
      if (l === 0) {
        d++;
        d = d % data.depth;
      }

      $scope.spriteLeft = l * data.lengthPX;
      $scope.spriteTop = d * data.depthPX;
      $scope.iBack = "url('" + data.url + "') " + $scope.spriteLeft + " " + $scope.spriteTop;
      $scope.apply();
    }, 1000);
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


    if ($scope.operation === "*"){
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
  }
  $scope.setOperands();

  angular.element(window).bind('keypress', function(e) {
//e.keycode
    $scope.keyPressed = Number(e.which);
    console.log("$scope.keyPressed "+Number(e.which));
    if ($scope.keyPressed === 110) {
      if ($scope.showAnswer) {
        $scope.showAnswer = false;
        $scope.setOperands();
      } else {
        $scope.showAnswer = true;
      }
    }
    $scope.$apply();
    $scope.keyPressed = null;
  });
}]);
