myApp.controller("AppController", function($scope, $stateParams, $http, $rootScope, $window) {
    $http({
        method: 'GET',
        url: 'data/data.json'
    }).then(function successCallback(response) {
        $scope.data = response.data.items;
    }, function errorCallback(response) {
        // |_|
    });
    

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        var pageUrl = toState.url
        if (toState.name === 'item') {
            pageUrl = pageUrl.replace(':itemId', toParams.itemId)
        }
        $window.ga('send', 'pageview', pageUrl);
    });
});

myApp.controller("HomeController", function($scope, $http, $state, $stateParams, $window) {

    $scope.selectedItem = $window.localStorage.getItem("carouselItem");
    if (!$scope.selectedItem) {
        $scope.selectedItem = 0;
    }
    

    $scope.$watch('data', function(data) {
        if ($scope.data) {
            $scope.initializeCarousel();
        }
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
            startPosition: $scope.selectedItem
        });
        $scope.owlHome = $(".owl-carousel");
        $scope.owl = $(".owl-carousel").data('owlCarousel');

        $('.owl-carousel').on('click', '.owl-item', function(e) {
            this.selectedId = $(this).find('.carousel-item').data('id');
            $window.ga('send', 'event', 'Carousel', 'click', $scope.data[this.selectedId].title);
            $state.go('item', {itemId: this.selectedId});
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

});


myApp.controller("ItemController", function($scope, $stateParams, $sce, $window) {
    $scope.sce = $sce;
    $scope.itemId = $stateParams.itemId;

    $window.localStorage.setItem("carouselItem", $scope.itemId);

    $scope.itemHolder = {data: {}};
    $scope.$watch('data', function(data) {
        if (data) {
            $scope.itemHolder.data = data;
        }
    });
});

myApp.controller("AboutController", function($scope, $http) {

    $http({
        method: 'GET',
        url: 'data/info.json'
    }).then(function successCallback(response) {
        $scope.infoData = response.data;
    }, function errorCallback(response) {
        // |_|
    });
});
