"use strict";

var app = angular.module('app', ['ngRoute'])

.config(['$sceDelegateProvider', function($sceDelegateProvider) {
  // We must whitelist the JSONP endpoint that we are using to show that we trust it
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    '/**'
  ]);
}])

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "../views/mainView.html"
    })

});
