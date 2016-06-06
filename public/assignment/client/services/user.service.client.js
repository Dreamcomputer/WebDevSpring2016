/**
 * Created by Rammer on 5/18/16.
 */

(function () {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            // Added while Server-Side Dev
            findUserByUsername: findUserByUsername,
            // Added to login with $http POST request while Server-Side Execution
            login: login,
            // Added to login with $http POST request while Server-Side Execution
            // for pulling current profile info from server
            getCurrentUser: getCurrentUser
        };

        return api;

        function getCurrentUser() {
            console.log(" in user service client top");
            console.log($rootScope.currentUser);
            console.log($rootScope.currentUser.user_id);
            return $rootScope.currentUser;
            //return $http.get("/api/assignment/currentuser");
        }

        function login(username, password) {
            return $http.post("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/create", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

        function updateUser(userId, user) {
            console.log("in user service client");
            console.log(userId, user);
            return $http.put("/api/assignment/user/" + userId, user);
        }

    }
})();