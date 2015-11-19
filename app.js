/**
 * Created by Administrator on 18-11-2015.
 */
(function(){
    "use strict";

    angular.module('flickrApp', ['ngMaterial'])
        .controller('ListController', ['$scope', '$log','$http', function($scope,$log,$http){
            $scope.results = [];
            $scope.isSearching = false;
            $scope.search = function(){
                $scope.isSearching = true;
                $http({
                    method: 'GET',
                    url: 'https://api.flickr.com/services/rest',
                    params: {
                        method:'flickr.photos.search',
                        api_key: '8df5f9d347ceed921e263ed5cbe43aaf',
                        text: $scope.projectSearch,
                        format: 'json',
                        nojsoncallback: 1
                    }
                }).success(function(data){
                    $scope.isSearching = false;
                    document.getElementById('noResult').innerHTML = '';
                    $scope.results = data;
                    if($scope.results.photos.photo.length === null || $scope.results.photos.photo.length === undefined || $scope.results.photos.photo.length === 0){
                        $log.log('No such result found');
                        document.getElementById('noResult').innerHTML = 'No Result Found.';
                        return;
                    }
                }).error(function(error){
                    $scope.isSearching = false;
                    $log.error(error);
                });
            };
        }]);
})();