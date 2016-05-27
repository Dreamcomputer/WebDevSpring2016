/**
 * Created by Rammer on 5/18/16.
 */

(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        $scope.login = login;

        function login() {
            UserService.findUserByCredentials($scope.loginUsername, $scope.loginPassword, function(found) {
                if (found) {
                    if (found) {
                        $rootScope.currentUser = found;
                        $location.url("/profile");
                    }
                }
            });
        }

    }
})();