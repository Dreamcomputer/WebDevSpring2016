/**
 * Created by Rammer on 5/18/16.
 */
'use strict';
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {

        // vm stands for ViewModel, this is the controller
        var vm = this;

        //Inject functoin into the view model
        vm.login = login;
        console.log(vm.username);
        console.log("Hey can you see this?");

        // tries to login if user exists (stored in the $rootScope)
        function login() {
            UserService.findUserByCredentials(vm.username, vm.password)
                .then(function(response) {
                if (response.data) {
                        $rootScope.currentUser = response.data;
                        $location.url("/profile");
                }
            });
        }

    }
}());