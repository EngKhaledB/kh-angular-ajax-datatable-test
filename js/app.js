var app = angular.module('app',[]);

app.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++) {
      input.push(i);
    }
    return input;
  };
});
app.factory('CountriesApi',['$http', function($http) {
    return {
      getCountries : function () {
        return $http.get('https://restcountries.eu/rest/v1/all');
      }
    }
  }
]);

app.controller('DataTableCtrl',function ($scope,$http,CountriesApi) {

  $scope.countries = []
  $scope.currentIndex = 0;
  $scope.itemsPerPage = 10;
  $scope.isLoading = true;
  $scope.pagesCount = function () {
    return Math.ceil($scope.countries.length / $scope.itemsPerPage);
  }

  $scope.changeIndex = function (newIndex) {
    $scope.currentIndex = newIndex;
  }

  $scope.nextPage = function () {
    if($scope.currentIndex == $scope.pagesCount()-1)
      return;

    $scope.currentIndex++;
  };

  $scope.prevPage = function () {
    if($scope.currentIndex == 0)
      return;

    $scope.currentIndex--;
  };

  $scope.countriesList = function () {
    var countriesCount = $scope.countries.length;

    if( countriesCount > 0 ){
      if( countriesCount >= ( ($scope.currentIndex+1) * $scope.itemsPerPage )){
        return $scope.countries.slice( $scope.currentIndex * $scope.itemsPerPage, ( ( $scope.currentIndex+1 ) * $scope.itemsPerPage ) );
      }else if( countriesCount > ( ($scope.currentIndex) * $scope.itemsPerPage ) ){
        return $scope.countries.slice( $scope.currentIndex * $scope.itemsPerPage ,countriesCount );
      }else{
        return $scope.countries;
      }
    }else{
      return [];
    }
  }

  function init() {
    CountriesApi.getCountries().success(function (data) {
      $scope.countries = data;
      $scope.isLoading = false;
    });
  }

  init();

});
