/**
 * Created by Rammer on 5/18/16.
 */
'use strict';
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService) {

        // vm stands for ViewModel, this is the controller
        var vm = this;

        //Inject function into the view model
        vm.login = login;
        // Inputs from view page as varibles here
        vm.username;
        vm.password;

        // tries to login if user exists (stored in the $rootScope)
        function login() {
                UserService.login(vm.username, vm.password)
                .then(function(response) {
                if (response.data) {
                        $rootScope.currentUser = response.data;
                        $location.url("/profile");
                }
            });
        }

    }
}());