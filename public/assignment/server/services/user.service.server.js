/**
 * Created by Rammer on 5/28/16.
 */

'use strict';

module.exports = function(app, usermodel) {
     app.post("/api/assignment/user", login);

   app.post("/api/assignment/create", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserbyId);
  //JA app.get("/api/assignment/user?username=username", findUserbyUsername);
  //JA app.get("/api/assignment/user?username=username&password=password", findUserbyCredentials);
    app.put("/api/assignment/user/:id", updateUserbyId);
    app.delete("/api/assignment/user/:id", deleteUserById);
    // Added to login with $http POST request while Server-Side Execution
     // app.post("/api/assignment/user?username=username&password=password", login);

    // Added to login with $http POST request while Server-Side Execution
    // for pulling current profile info from server
    app.get("/api/assignment/currentuser", getCurrentUser);

    function getCurrentUser(req, res) {
        res.json(req.session.currentUser);
    }

    function login(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var credentials = {
            username: username,
            password: password
        };
        var user = usermodel.findUserByCredentials(credentials);
        //
        req.session.currentUser = user;
        res.json(user);
    }

    function createUser(req, res) {
        var user = req.body;
        var newUsers = usermodel.Create(user);
        req.session.currentUser = user;
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
        req.session.currentUser = user;
        res.json(found);
    }

    function deleteUserById(req, res) {
        var id = req.params(id);
        usermodel.Delete(id);
        res.json(usermodel.FindAll());

    }
};