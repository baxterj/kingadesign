myApp.controller("HomeController", function($scope, $http) {

    $scope.selectedId = 0;

    $http({
        method: 'GET',
        url: 'data/data.json'
    }).then(function successCallback(response) {
        $scope.data = response.data.items;
        $scope.initializeCarousel();
    }, function errorCallback(response) {
        // |_|
    });

    $scope.initializeCarousel = function() {
        var html = "";
        angular.forEach($scope.data, function(value, key) {
            html += '<div class="carousel-item portrait" style="width:auto;" data-id="' + key + '">\n'
                + '<img src="' + value.cover + '" />\n'
                + '</div>\n';
        })

        $(".owl-carousel").html(html);

        $(".owl-carousel").owlCarousel({
            autoWidth: true,
            margin: 10,
            center: true,
            loop: true,
            // items: 1
        });
        $scope.owlHome = $(".owl-carousel");
        $scope.owl = $(".owl-carousel").data('owlCarousel');

        $('.owl-carousel').on('click', '.owl-item', function(e) {
            $scope.selectedId = $(this).find('.carousel-item').data('id');
            $scope.$apply(function() {
                $scope.updateModalContent();
            }); 
        });

        $(document.documentElement).keydown(function(e) {
            if (e.keyCode === 37) {
                $scope.owlHome.trigger('prev.owl');
            } else if (e.keyCode === 39) {
                $scope.owlHome.trigger('next.owl');
            }
        });

        // $('.owl-carousel').on('mousewheel', '.owl-item', function(e) {
        //     if ($(window).width() > 768) {
        //         if (e.originalEvent.wheelDelta / 120 > 0) {
        //             $scope.owlHome.trigger('prev.owl');
        //         } else {
        //             $scope.owlHome.trigger('next.owl');
        //         }
        //         e.preventDefault();
        //     };
        // });
    };

    $scope.updateModalContent = function() {
        $scope.selectedData = $scope.data[$scope.selectedId];
        $scope.showNextPrevious(true);
        $("#contentModal").modal(true);
    };

    $(document).on('hidden.bs.modal', '#contentModal', function(){
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

myApp.controller("FooterController", function($scope, $http) {

    $http({
        method: 'GET',
        url: 'data/info.json'
    }).then(function successCallback(response) {
        $scope.infoData = response.data;
    }, function errorCallback(response) {
        // |_|
    });

    $scope.displayInfo = function() {
        $("#infoModal").modal(true);
    }

});
