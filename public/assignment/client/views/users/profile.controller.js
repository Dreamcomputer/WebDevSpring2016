/**
 * Created by Rammer on 5/18/16.
 */

(function () {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService){

        var vm = this;
        vm.update = update;

        // To update the current view with current user's information
        function init() {
            UserService.getCurrentUser()
                .then(function(response) {
                    if (response.data) {
                        vm.user = response.data;
                    }
                });
        }
        init();

        // To create a new object with updated attributes
        function update(user) {
            console.log("ppppp");
            console.log(user);
            UserService.updateUser(vm.user._id, user)
                .then(function(response) {
                if (response.data) {
                    $location.url("/profile");
                }
            });

        }
    }



})();
