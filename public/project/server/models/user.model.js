/**
 * Created by Rammer on 6/18/16.
 */


var q = require('q');
'use strict';

module.exports = function (mongoose, db) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('User', UserSchema);
    var api = {
        Create: Create,
        //FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function Create(givenuser) {

        var deferred = q.defer();
        UserModel.create(givenuser, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function FindById(userId) {

        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                console.log("in user model");
                console.log(err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function Update(userId, user) {

        var deferred = q.defer();
        var newUser = {
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            emails: user.emails,
            phones: user.phones,
            roles: user.roles,
        };

        UserModel.findByIdAndUpdate(userId, {$set:newUser}, {new: true, upsert: true}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function Delete(userId) {

        var deferred = q.defer();
        UserModel.delete({_id: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findUserByUsername(username) {

        var deferred = q.defer();
        UserModel.findOne({username: username}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findUserByCredentials(credentials) {

        // To pull out credentials
        var username = credentials.username;
        var password = credentials.password;

        console.log("BUMUMUMUMUMUM");
        console.log(username, password);

        var deferred = q.defer();
        UserModel.findOne(
            {username: username,
                password: password},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

};
