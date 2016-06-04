/**
 * Created by Rammer on 5/27/16.
 */
var users = require("./user.mock.json");

'use strict';
module.exports = function() {
    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function Create(givenuser) {
        var newUser = {
            _id: (new Date).getTime(),
            username: givenuser.username,
            password: givenuser.password,
            firstName: givenuser.firstName,
            lastName: givenuser.lastName,
            roles: givenuser.roles,
            email: givenuser.email
        };
        users.push(newUser);
        return newUser;
    }

    function FindAll() {
        return users;
    }

    function FindById(userId) {
        var found = null;
        users.forEach(function(user) {
            if(userId === user._id) {
                found = user;
            }
            return found;
        })
    }

    function Update(userId, newUser) {
        var user = FindById(userId);
        if (user != null) {
            user._id = newUser._id;
            user.username = newUser.username;
            user.password = newUser.password;
            user.firstName = newUser.firstName;
            user.lastName = newUser.lastName;
            user.roles = newUser.roles;
            user.email = newUser.email;
        }
        return users;
    }

    function Delete(userId) {
        var user = FindById(userId);
        if (user != null) {
            users.splice(users.indexOf(user), 1);
        }
    }

    function findUserByUsername(username) {
        var found = null;
        for (var u in users) {
            if (users[u].username === username) {
                found = users[u];
            }
        }
        return found;
    }

    function findUserByCredentials(credentials) {
        var username = credentials.username;
        var password = credentials.password;

        var found = null;

        for (var u in users) {
            if (users[u].username === username && users[u].password === password) {
                found = users[u];
            }
        }
        return found;
    }

};
