var myApp = angular.module('myApp', ['ui.router', 'ngSanitize']);

myApp.controller("AppController", function($scope) {
    $scope.testing = 'testing123';
});


myApp.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to here
  $urlRouterProvider.otherwise("/home");
  // Now set up the states
  $stateProvider
    .state('home', {
        url: "/home",
        templateUrl: "js/angular/views/home.html"
    })

    .state('home.view', {
        url: "/view/{name}",
        controller: function($scope, $stateParams) {
            $scope.name = $stateParams.name;
        },
        template: '<div kinga-modal name="name"></div>'
    })
});