/**
 * Created by Rammer on 5/18/16.
 */

/**
(function() {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
});
 */

var app = angular.module('FormBuilderApp');

app.controller('MainController', function($scope, $location){

    $scope.MainController = function() {
        $scope.$location = $location;
    }
});