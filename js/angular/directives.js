myApp.directive("kingaHeader", function() {
    return {
        controller: function($scope, $http) {
            
        },
        templateUrl: "js/angular/tpl/header.html"
    }
});

myApp.directive("kingaFooter", function() {
    return {
        templateUrl: "js/angular/tpl/footer.html"
    }
});
