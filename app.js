angular.module('dogApp', ['ui.bootstrap'])
  .controller('DogAppController', function($scope, DogService) {
    
    // set up pagination defaults
    $scope.pagination = {
      currentPage: 1,
      numPerPage: 4
    };

    // fetch list of dog breeds using DogService for the http request
    $scope.getDogBreeds = function() {
      DogService.getDogBreeds().then(
        function(response) {
          $scope.dogBreedList = response.data.message;
        }).catch( function(errorResponse) {
          console.log('Error loading list of dog breeds', errorResponse);
        });
    };

    // fetch array of image links for a certain breed
    $scope.getDogImages = function(breed) {
      DogService.getDogImages(breed).then(
        function(response) {
          $scope.dogImages = response.data.message;
          $scope.currentImages = $scope.dogImages.slice(0, $scope.numPerPage);
        }).catch( function(errorResponse) {
          console.log('Error fetching dog images', errorResponse);
        });
    };

    // fetch new images and reset current page number when new breed type is selected
    $scope.fetchImages = function() {
      $scope.getDogImages($scope.selectedBreed);
      $scope.pagination.currentPage = 1;
    };

    // return a shorter array of images to display depending on the page number and default number of images per page
    $scope.pageChanged = function() {
      var begin = ($scope.pagination.currentPage - 1) * $scope.pagination.numPerPage;
      var end = begin + $scope.pagination.numPerPage;
      $scope.currentImages = $scope.dogImages.slice(begin, end);
    };

    // initialise app
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