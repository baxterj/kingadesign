myApp.controller("HomeController", function($scope, $http) {

    $http({
        method: 'GET',
        url: 'js/angular/data/data.json'
    }).then(function successCallback(response) {
        $scope.data = response.data.items;
        $scope.initializeCarousel();
    }, function errorCallback(response) {
        $scope.goHome();
    });

    $scope.initializeCarousel = function() {
        var html = "";
        angular.forEach($scope.data, function(value, key) {
            html += '<div class="carousel-item" data-id="' + key + '">\n'
                + '<img src="' + value.cover + '" />\n'
                + '</div>\n';
        })

        $(".owl-carousel").html(html);

        $(".owl-carousel").owlCarousel({
            autoWidth: true,
            margin: 10,
            center: true,
            loop: true
        });
        $scope.owl = $(".owl-carousel").data('owlCarousel');

        $('.owl-carousel').on('click', '.owl-item', function (e) {
            var selectedId = $(this).find('.carousel-item').data('id');
            // $rootScope.$emit('showView', {id: selectedId})
            $scope.$apply(function() {
                $scope.selectedData = $scope.data[selectedId];
                $("#myModal").modal(true);
            });
        });
    }
    
    $('#myModal').on('hidden.bs.modal', function () {
        $("#myModal").modal('hide');
    });   

});
