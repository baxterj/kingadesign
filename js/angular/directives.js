myApp.directive("kingaHeader", function() {
    return {
        templateUrl: "js/angular/tpl/header.html"
    }
});

myApp.directive("kingaFooter", function() {
    return {
        templateUrl: "js/angular/tpl/footer.html"
    }
});

myApp.directive("kingaModal", function() {
    return {
        scope: {
            name: '='
        },
        controller: function($scope, $state, $http) {
            $scope.title = undefined;
            $scope.text = undefined;
            $scope.images = [];

            $("#myModal").modal(true);

            $scope.goHome = function() {
                $state.go('home');
            };

            $('#myModal').on('hidden.bs.modal', function () {
                $scope.goHome();
            });

            $http({
                method: 'GET',
                url: 'js/angular/data/' + $scope.name + '.json'
            }).then(function successCallback(response) {
                $scope.title = response.data.title;
                $scope.text = response.data.text;
                if (response.data.images) {
                    $scope.images = response.data.images;
                }
            }, function errorCallback(response) {
                $scope.goHome();
            });
        },
        templateUrl: "js/angular/tpl/modal.html"
    }
});
