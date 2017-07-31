angular.module('dogApp', [])
  .controller('DogAppController', function($scope, DogService) {

    $scope.getDogBreeds = function() {
      DogService.getDogBreeds().then(
        function(response) {
          $scope.dogBreedList = response.data.message;
        }).catch( function(errorResponse) {
          console.log('Error loading list of dog breeds', errorResponse);
        });
    };

    $scope.init = function() {
      $scope.getDogBreeds();
    };

    $scope.init();
 })

  .factory('DogService', function($http) {
    return {
      getDogBreeds: function() {
        return $http.get("https://dog.ceo/api/breeds/list");
      }
    }
  });