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

    $scope.getDogImages = function(breed) {
      DogService.getDogImages(breed).then(
        function(response) {
          $scope.dogImages = response.data.message;
        }).catch( function(errorResponse) {
          console.log('Error fetching dog images', errorResponse);
        });
    }

    $scope.getImages = function() {
      $scope.getDogImages($scope.selectedBreed);
    }

    $scope.init = function() {
      $scope.getDogBreeds();
    };

    $scope.init();
 })

  .factory('DogService', function($http) {
    return {
      getDogBreeds: function() {
        return $http.get("https://dog.ceo/api/breeds/list");
      },
      getDogImages: function(breed) {
        return $http.get("https://dog.ceo/api/breed/" + breed + "/images");
      }
    }
  });