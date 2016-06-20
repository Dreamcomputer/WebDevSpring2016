var q = require('q');
'use strict';

module.exports = function (mongoose, db) {

    var LogSchema = require("./log.schema.server.js")(mongoose);
    var LogModel = mongoose.model('Log', LogSchema);

    var api = {

        // 2. Added function for formservice method
        createNewCheckforUserId: createNewCheckforUserId,

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
        console.log("so reached here TOOO??" + newcheck.content + typeof (newcheck.content));

        var deferred = q.defer();

        LogModel.create(newcheck, function (err, doc) {
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