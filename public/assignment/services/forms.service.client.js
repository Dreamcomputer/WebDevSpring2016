/**
 * Created by Rammer on 5/20/16.
 */

(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope) {

        var forms = [];
        forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return service;

        function createFormForUser(userId, form, callback) {
            var unique = (new Date).getTime();

            form._id = unique;
            form.userId = userId;
            forms.push(form);
            callback(forms);
        }

        function findAllFormsForUser(userId, callback) {
            var found = [];

            forms.forEach(function(form) {
                if (form.userId === userId) {
                    found.push(form);
                }
            });
            callback(found);
        }

        function deleteFormById(formId, callback) {

            forms = forms.filter(function(form) {
                return form._id !== formId;
            });
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {

            forms.forEach(function(form) {
                if (form._id === formId) {
                    form.title = newForm.title;
                }
            });
            callback(forms);
            }
        }
})();