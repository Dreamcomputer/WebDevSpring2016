/**
 * Created by Rammer on 5/18/16.
 */

(function () {
    'use strict';

   angular
       .module("FormBuilderApp")
       .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {

        $scope.register = register;

        function register() {
            var newUser = {
                firstName: null,
                lastName: null,
                username: $scope.username,
                password: $scope.password,
                email: $scope.email
            };

        UserService.createUser(newUser, function(user) {
          if(user) {
            $rootScope.user = user;
            $rootScope.currentUser = user;
            $location.url("/profile");
          }
         });
        }
    }
})();