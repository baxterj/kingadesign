var myApp = angular.module('myApp', ['ui.router', 'ngSanitize', 'ngCookies']);


myApp.config(function($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {

  $urlMatcherFactoryProvider.strictMode(false);
  // For any unmatched url, redirect to here
  $urlRouterProvider.otherwise("/home/");
  // Now set up the states
  $stateProvider
    .state('home', {
        url: "/home",
        templateUrl: "js/angular/views/home.html"
    })

    .state('item', {
        url: "/view/:itemId",
        templateUrl: "js/angular/views/item.html"
    })

    .state('about', {
        url: "/about",
        templateUrl: "js/angular/views/about.html"
    })
});

