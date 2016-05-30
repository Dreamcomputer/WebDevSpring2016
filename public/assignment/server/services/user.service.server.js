/**
 * Created by Rammer on 5/28/16.
 */

'use strict';

module.exports = function(app, usermodel) {

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserbyId);
    app.get("/api/assignment/user?username=username", findUserbyUsername);
    app.get("/api/assignment/user?username=username&password=password", findUserbyCredentials);
    app.put("/api/assignment/user/:id", updateUserbyId);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res) {
        var user = req.body;
        var newUsers = usermodel.Create(user);
        res.json(newUsers);
    }

    function findAllUsers(req, res) {
        res.json(userModel.FindAll());
    }

    function findUserbyId(req, res) {
        var id = req.params.id;
        var found = usermodel.FindById(id);
        res.json(found);
    }

    function findUserbyUsername(req, res) {
        var username = req.params.username;
        var found = usermodel.findUserbyUsername(username);
        res.json(found);
    }

    function findUserbyCredentials(req, res) {
        var username = req.params.username;
        var password = req.params.password;
        var credentials = {
            username: username,
            password: password
        };
        var found = usermodel.findUserByCredentials(credentials);
        res.json(found);
    }

    function updateUserbyId(req, res) {
        var id = req.params.id;
        var user = req.body;
        var found = usermodel.Update(id, user);
        res.json(found);
    }

    function deleteUserById(req, res) {
        var id = req.params(id);
        usermodel.Delete(id);
        res.json(usermodel.FindAll());

    }
};