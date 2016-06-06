var q = require('q');
'use strict';

module.exports = function (mongoose, db) {

    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FieldModel = mongoose.model('Field', FieldSchema);
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model('Form', FormSchema);

    var api = {
       // Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findFormByTitle: findFormByTitle,
        // 1. Added function for formservice method
        findAllFormsforUserId: findAllFormsforUserId,
        // 2. Added function for formservice method
        createNewFormforUserId: createNewFormforUserId,
        // 1. Added function for fieldservice method
        findAllFieldsForFormId: findAllFieldsForFormId,
        // 2. Added function for fieldservice method
        findFieldByFieldandFormId: findFieldByFieldandFormId,
        // 3. Added function for fieldservice method
        deleteFieldByFieldandFormId: deleteFieldByFieldandFormId,
        // 4. Added function for fieldservice method
        createNewFieldForFormId: createNewFieldForFormId,
        // 5. Added function for fieldservice method
        updateFieldByFormId: updateFieldByFormId
    };
    return api;

    function findAllFieldsForFormId(formId) {

        var deferred = q.defer();
        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc.fields);
            }
        });

        return deferred.promise;
    }

    function findFieldByFieldandFormId(formId, fieldId) {

        var deferred = q.defer();
        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                for (var f in doc.fields) {
                    if (doc.fields[f]._id === fieldId) {
                        deferred.resolve(doc.fields[f]);
                        return deferred.promise;
                    }
                }
                deferred.reject("Could not find field");
            }
        });
        return deferred.promise;
    }

    function deleteFieldByFieldandFormId(fieldId, formId) {

        var deferred = q.defer();
        FormModel.findByIdAndUpdate(formId, {
                $pull: {fields:
                {_id: fieldId}
                }},
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

    function createNewFieldForFormId(formId, field) {

        var deferred = q.defer();
        FormModel.findByIdAndUpdate(formId, {$push: {"fields": field}}, {new: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc)
            }
        });

        return deferred.promise;
    }

    function updateFieldByFormId(formId, fieldId, field) {

        var deferred = q.defer();
        FormModel.update({_id: formId, "fields._id" : field._id}, {$set: {"fields.$": field}}, {new: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                console.log(doc);
                deferred.resolve(doc)
            }
        });

        return deferred.promise;
    }


    function findAllFormsforUserId(userId) {

        var deferred = q.defer();
        FormModel.find({userId: userId}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function createNewFormforUserId(userId, form) {
        var newform = {
            title: form.title,
            userId: userId,
            fields: [],
            created: (new Date).getTime(),
            updated: (new Date).getTime()
        };

        var deferred = q.defer();

        FormModel.create(newform, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }
/**
    function Create(form) {
        var newForm = {
          _id: form._id,
          title: form.title,
          userId: form.userId,
          fields: []
        };
        forms.push(newForm);
        return forms;
    }
**/
    function FindAll() {

    var deferred = q.defer();
    FormModel.find({}, function(err, doc) {
        if (err) {
            deferred.reject(err);
        }
        else {
            deferred.resolve(doc);
        }
    });
    return deferred.promise;
    }

    function FindById(formId) {
        var deferred = q.defer();

        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function Update(formId, form) {
        var newForm = {
            title: form.title,
            updated: (new Date).getTime()
        };

        var deferred = q.defer();

        form.updated = (new Date).getTime();

        FormModel.findByIdAndUpdate(formId, {$set:newForm}, {new: true, upsert: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function Delete(formId) {
        var deferred = q.defer();

        FormModel.remove({_id: formId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();

        FormModel.findOne({title: title}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
    }
};