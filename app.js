angular.module('dogApp', [])
  .controller('DogAppController', function($scope) {
    $scope.dogBreedList = 
      {
        "status": "success",
        "message": [
          "affenpinscher",
          "african",
          "airedale",
          "akita",
          "appenzeller"]
      };
 });