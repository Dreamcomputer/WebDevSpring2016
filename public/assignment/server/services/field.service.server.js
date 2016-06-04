
'use strict';

/**
 * Created by Rammer on 5/28/16.
 */

module.exports = function(app, usermodel, formmodel) {
    app.get("/api/assignment/form/:formId/field", findAllFieldsforFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldbyFieldandFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldbyFieldandFormId);
    app.post("/api/assignment/form/:formId/field", createNewFieldforFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldbyFormId);

    function findAllFieldsforFormId(req, res) {
        var formId = req.params.formId;
        var found = formmodel.findAllFieldsForFormId(formId);
        res.json(found);
    }

    function findFieldbyFieldandFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var found = formmodel.findFieldByFieldandFormId(fieldId, formId);
        res.json(found);
    }

    function deleteFieldbyFieldandFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var found = formmodel.deleteFieldByFieldandFormId(fieldId, formId);
        res.json(formmodel.findAllFieldsForFormId(formId));
    }

    function createNewFieldforFormId(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var newField = formmodel.createNewFieldForFormId(formId, field);
        res.json(formmodel.findAllFieldsForFormId(formId));
    }

    function updateFieldbyFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        var updatedFields = formmodel.updateFieldByFormId(formId, fieldId, field);
        res.json(updatedFields);
    }
};