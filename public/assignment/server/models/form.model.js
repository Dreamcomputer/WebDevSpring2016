var forms = require("./form.mock.json");

'use strict';

module.exports = function() {

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findFormByTitle: findFormByTitle,
        // 1. Added function for formservice method
        findAllFormsofUserId: findAllFormsofUserId,
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
        var found = [];
        var form = FindById(formId);
        if (form) {
            found = form.fields;
        }
        return found;
    }

    function findFieldByFieldandFormId(formId, fieldId) {
        var found = null;
        var fields = findAllFieldsForFormId(formId);
        if (fields) {
            for (var fi in fields) {
                if (fields[fi]._id === fieldId) {
                    found = fields[fi];
                }
            }
        }
        return found;
    }

    function deleteFieldByFieldandFormId(fieldId, formId) {
        var field = findFieldByFieldandFormId(formId, fieldId);
        var fields = findAllFieldsForFormId(formId);
        if (field) {
            fields.splice(fields.indexOf(field), 1);
        }
    }

    function createNewFieldForFormId(formId, field) {
        var newField = {
            _id : (new Date).getTime().toString(),
            label: field.label,
            type: field.type,
            placeholder: field.placeholder,
            options: field.options
        };

        var fields = findAllFieldsForFormId(formId);
        fields.push(newField);

        // To make a new form with the new field
        var form = FindById(formId);
        var newForm = {
            _id : form._id,
            title : form.title,
            userid : form.userId,
            fields: fields
        };
        Update(formId, newForm);
        return newField;
    }

    function updateFieldByFormId(formId, fieldId, field) {
        var fieldtoUpdate = findFieldByFieldandFormId(formId, fieldId);
        if (fieldtoUpdate) {
            fieldtoUpdate._id = field._id;
            fieldtoUpdate.label = field.label;
            fieldtoUpdate.type = field.type;
            fieldtoUpdate.placeholder = field.placeholder;
            fieldtoUpdate.options = field.options;
            return fieldtoUpdate;
        } else {
            return null;
        }
    }

    function findAllFormsofUserId(userId) {
        var found = [];
        for (var f in forms) {
            if (forms[f].userId == userId) {
                found.push(forms[f]);
            }
        }
        return found;
    }

    function createNewFormforUserId(userId, form) {
        var newForm = {
            _id: (new Date).getTime().toString(),
            title: form.title,
            userId: userId,
            fields: []
        };
        forms.push(newForm);
        var userId = newForm.userId;
        var result = findAllFormsofUserId(userId);
        return result;
    }

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

    function FindAll() {
        return forms;
    }

    function FindById(formId) {
        var found = null;

        for (var f in forms) {
            if (forms[f]._id === formId) {
                found = forms[f];
            }
        }
        return found;
    }

    function Update(formId, form) {
        var found = FindById(formId);
        if (found != null) {
            found.title = form.title;
        }
        var userId = found.userId;
        return findAllFormsofUserId(userId);
    }

    function Delete(formId) {
        var foundform = FindById(formId);
        var IDofUser = foundform.userId;
        if (foundform != null) {
         forms.splice(forms.indexOf(foundform), 1);
        }
        var result = findAllFormsofUserId(IDofUser);
        return result;
    }

    function findFormByTitle(title) {
        var found = null;
        for (var f in forms) {
            if (forms[f].title === title) {
                found = forms[f];
            }
        }
        return found;
    }
};