var q = require('q');
'use strict';

module.exports = function (mongoose, db) {

    var LogSchema = require("./log.schema.server.js")(mongoose);
    var LogModel = mongoose.model('Log', LogSchema);

    var api = {
        createNewCheckforUserId: createNewCheckforUserId,
        findAlllogsForUserId: findAlllogsForUserId,
        displayChecksForUserDate: displayChecksForUserDate

    };
    return api;

    function createNewCheckforUserId(userId, check) {
        var newcheck = {
            name: check.name,
            content: check.content.body,
            userId: userId,
            date: check.date,
            note: check.note
        };

        var deferred = q.defer();

        LogModel.create(newcheck, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                console.log("This does work");
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    // For Displaying checked for a particular date
    function displayChecksForUserDate(userId, date) {
        console.log("This is the date appearance: " + date);
        var timeConstant = "T00:00:01Z";
        var sDate = date.concat(timeConstant);
        var deferred = q.defer(); // INsert the Mongod db query below with the date
        LogModel.find({userId: userId, date: { $gte : (sDate) }}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAlllogsForUserId(userId) {
      //  console.log("You are being called");
        var deferred = q.defer();
        LogModel.find({userId: userId}, function(err, doc) {
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