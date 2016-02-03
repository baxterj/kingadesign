myApp.controller("HomeController", function($scope, $http) {

    $scope.selectedId = 0;

    $http({
        method: 'GET',
        url: 'js/angular/data/data.json'
    }).then(function successCallback(response) {
        $scope.data = response.data.items;
        $scope.initializeCarousel();
    }, function errorCallback(response) {
        // |_|
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
            $scope.selectedId = $(this).find('.carousel-item').data('id');
            $scope.$apply(function() {
                $scope.updateModalContent();
            }); 
        });
    };

    $scope.updateModalContent = function() {
        $scope.selectedData = $scope.data[$scope.selectedId];
        $scope.showNextPrevious(true);
        $("#myModal").modal(true);
    };

    $(document).on('hidden.bs.modal', '#myModal', function(){
        $scope.showNextPrevious(false);
    });

    $scope.showNextPrevious = function(doShow) {
        if (doShow === true) {
            $('.nextPrevious').fadeIn(300);
        } else {
            $('.nextPrevious').fadeOut(0);
        }
    };

    $scope.doNext = function() {
        if ($scope.selectedId < $scope.data.length - 1) {
            $scope.selectedId++;
        } else {
            $scope.selectedId = 0;
        }
        
        $scope.updateModalContent();
    };

    $scope.doPrevious = function() {
        if ($scope.selectedId > 0) {
            $scope.selectedId--;
        } else {
            $scope.selectedId = $scope.data.length - 1;
        }
        
        $scope.updateModalContent();
    };

});
