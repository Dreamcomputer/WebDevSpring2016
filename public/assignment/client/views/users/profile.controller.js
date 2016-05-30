/**
 * Created by Rammer on 5/18/16.
 */

(function () {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService){
        $scope.update = update;

        var currentUser = $rootScope.currentUser;

        // To update the current view with current user's information
        $scope.profileUsername = currentUser.username;
        $scope.profilePassword = currentUser.password;
        $scope.profileFirstName = currentUser.firstName;
        $scope.profileLastName = currentUser.lastName;
        $scope.profileEmail = currentUser.email;

        // To create a new object with updated attributes
        function update() {
            var newUser = {
                username: $scope.profileUsername,
                password: $scope.profilePassword,
                firstName: $scope.profileFirstName,
                lastName: $scope.profileLastName,
                email: $scope.profileEmail
            };

            UserService.updateUser(currentUser._id, newUser, function(found) {
                if (found) {
                    $location.url("profile");
                    console.log(found);
                }
            });

        }
    }



})();
