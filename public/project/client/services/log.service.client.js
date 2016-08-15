/**
 * Created by Rammer on 6/15/16.
 */

(function () {
    'use strict';
    angular
        .module("CheckLogApp")
        .factory("LogService", LogService);

    function LogService($http) {

        var service = {
            createCheckForUser: createCheckForUser,
            findAlllogsForUser: findAlllogsForUser,
            displayChecksForUser: displayChecksForUser

        };

        return service;

        function createCheckForUser(userId, check) {
            return $http.post("/api/assignment/user/" + userId + "/check", check);
        }

        function findAlllogsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId + "/check");
        }

        function displayChecksForUser(userId, date) {
            return $http.get("/api/assignment/user/" + userId + "/date/" + date + "/check");
        }
    }
})();