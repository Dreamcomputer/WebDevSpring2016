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
            createCheckForUser: createCheckForUser
        };

        return service;

        function createCheckForUser(userId, check) {
            console.log("so reached here TOOO?? CLIENT - 1/3");
            return $http.post("/api/assignment/user/" + userId + "/check", check);
        }
    }
})();