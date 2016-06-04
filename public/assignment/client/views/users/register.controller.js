/**
 * Created by Rammer on 5/18/16.
 */

(function () {
    'use strict';

   angular
       .module("FormBuilderApp")
       .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, UserService) {

        var vm = this;
        vm.register = register;

        // Inputs from view page as varibles here
        // (only listed the ones that are needed to control the view)
        vm.username;
        vm.password;
        vm.email;/Users/Rammer/WebstormProjects/cs4550/webdevelopment

        function register() {
            var newUser = {
                firstName: null,
                lastName: null,
                username: vm.username,
                password: vm.password,
                email: vm.email
            };

        UserService.createUser(newUser)
            .then(function(response) {
               if(response.data) {
             $rootScope.user = response.data;
            $rootScope.currentUser = response.data;
            $location.url("/profile");
          }
         });
        }
    }
})();