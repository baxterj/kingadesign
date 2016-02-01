var myApp = angular.module('myApp', ['ui.router', 'ngSanitize']);

myApp.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to here
  $urlRouterProvider.otherwise("/home");
  // Now set up the states
  $stateProvider
    .state('home', {
        url: "/home",
        templateUrl: "js/angular/views/home.html"
    })
});
