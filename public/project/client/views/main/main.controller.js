/**
 * Created by Rammer on 6/15/16.
 */

var app = angular.module('CheckLogApp');

app.controller('MainController', function($scope, $location){

    $scope.MainController = function() {
        $scope.$location = $location;
    }
});