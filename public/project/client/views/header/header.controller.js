/**
 * Created by Rammer on 6/15/16.
 */

'use strict';
(function () {
    angular
        .module("CheckLogApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location) {

        $scope.logout = logout;

        function logout() {
            $rootScope.currentUser = null;
            $location.url("/home");
        }
    }
})();