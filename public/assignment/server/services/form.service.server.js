/**
 * Created by Rammer on 5/28/16.
 */

module.exports = function(app, formmodel) {
    app.get("/api/assignment/user/:userId/form", findAllFormsofUserId);
    app.get("/api/assignment/form/:formId", findFormbyId);
    app.delete("/api/assignment/form/:formId", deleteFormbyId);
    app.post("/api/assignment/user/:userId/form", createNewFormForUserId);
    app.put("/api/assignment/form/:formId", updateFormbyId);

    function findAllFormsofUserId(req, res) {
        var userId = req.params.userId;
        var found = formmodel.findAllFormsofUserId(userId);
        res.json(found);
    }

    function findFormbyId(req, res) {
        var formId = req.params.formId;
        var found = formmodel.FindById(formId);
        res.json(found);
    }

    function deleteFormbyId(req, res) {
        var formId = req.params.formId;
        var found = formmodel.Delete(formId);
        res.json(found);
    }

    function createNewFormForUserId(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        var newform = formmodel.createNewFormforUserId(userId, form);
        res.json(newform);
    }

    function updateFormbyId(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        var result = formmodel.Update(formId, form);
        res.json(result);
    }
};