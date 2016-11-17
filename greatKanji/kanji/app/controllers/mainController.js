app.controller('mainCtrl', ['$scope', '$http', '$templateCache', '$interval', 'myService', function($scope, $http, $templateCache, $interval, myService) {

  $scope.names;

  //$http.get("http://www.w3schools.com/angular/customers_mysql.php")
  $http.get("../../phpCrud/test.php")
  //  $http.get("../../phpCrud/test.php")

  //C:\Bitnami\wampstack-5.6.28-0\apache2\htdocs\greatKanji\phpCrud\test.php
   .then(function (response) {
     console.dir(response);
     $scope.names = response.data.records;
   });

}]);
