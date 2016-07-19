var q = require('q');
'use strict';

module.exports = function (mongoose, db) {

    var LogSchema = require("./log.schema.server.js")(mongoose);
    var LogModel = mongoose.model('Log', LogSchema);

    var api = {
        createNewCheckforUserId: createNewCheckforUserId,
        findAlllogsForUserId: findAlllogsForUserId

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

    function findAlllogsForUserId(userId) {
      //  console.log("You are being called");
        var deferred = q.defer();
        LogModel.find({userId: userId}, function(err, doc) {
            if (err) {
             //   console.log("failed here");
                deferred.reject(err);
            }
            else {
               // console.log("Well passed" + doc);
                deferred.resolve(doc);
            }
        });

        return deferred.promise;

    }


};