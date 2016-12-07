"use strict";

var flashApp = angular.module('flashApp', ['ngRoute'])
.constant('level', 1)
.config(['$sceDelegateProvider', function($sceDelegateProvider) {
  // We must whitelist the JSONP endpoint that we are using to show that we trust it
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    '/**'
  ]);
}]);

flashApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "../views/interlude.html"
    })
    .when("/mainView", {
        templateUrl : "../views/mainView.html"
    });

});
