(function(angular) {
  'use strict';
var myApp = angular.module('spicyApp1', []);

myApp.controller('SpicyController', ['$scope', function($scope) {
    $scope.spice = 'very';

    $scope.chiliSpicy = function() {
        $scope.spice = 'chili';

    };

    $scope.jalapenoSpicy = function() {
        $scope.spice = 'jalapeño';

    };
}]);
})(window.angular);


$scope.getCats = function() {
  // Yahoo Dev Network/Flickr API url
  $http.get("")
    .success(function (data){
      console.log('this is flickr data :',data)

      console.log('urlObj :',$scope.urlObj)
      console.log('$scope.urlArr :',$scope.urlArr)

    })
    .error(function(err) {
    console.log('ERROR: ', err);
  })
}
