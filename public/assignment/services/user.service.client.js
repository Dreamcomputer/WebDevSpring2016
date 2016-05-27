/**
 * Created by Rammer on 5/18/16.
 */

(function () {
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {

        var users = [];
        users = [
            {
                "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                "username": "alice", "password": "alice", "roles": ["student"]
            },
            {
                "_id": 234, "firstName": "Bob", "lastName": "Hope",
                "username": "bob", "password": "bob", "roles": ["admin"]
            },
            {
                "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                "username": "charlie", "password": "charlie", "roles": ["faculty"]
            },
            {
                "_id": 456, "firstName": "Dan", "lastName": "Craig",
                "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
            },
            {
                "_id": 567, "firstName": "Edward", "lastName": "Norton",
                "username": "ed", "password": "ed", "roles": ["student"]
            }
        ];

        var service = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return service;

        function findUserByCredentials(username, password, callback) {
            var found = null;

            users.forEach(function (user) {
                if (user.username === username && user.password === password) {
                    found = user;
                }
            });
            callback(found);
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            user._id = (new Date).getTime();
            users.push(user);
            $rootScope.userList = users;
            callback(user);

        }

        function deleteUserById(userId, callback) {
            users = users.filter(function (user) {
                return user._id === userId;
            });
            callback(users);
        }

        function updateUser(userId, user, callback) {

            var found = null;
            users.forEach(function (previousUser) {
                if (user._id === userId) {
                    previousUser.firstName = user.firstName;
                    previousUser.lastName = user.lastName;
                    previousUser.username = user.username;
                    previousUser.password = user.password;
                    previousUser.email = user.email;

                    found = previousUser;
                    $rootScope.currentUser = found;
                }
            });
            callback(found);
        }

    }
})();