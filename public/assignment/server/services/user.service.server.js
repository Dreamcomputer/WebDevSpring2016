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
        usermodel.findUserByCredentials(credentials)
        .then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function createUser(req, res) {
        var user = req.body;

        usermodel.Create(user)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
        /*
        var newUsers = usermodel.Create(user);
        req.session.currentUser = user;
        res.json(newUsers);
        */
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
        console.log("user service server");
        console.log(id);
        var user = req.body;
        console.log(user);

        usermodel.Update(id, user)
            .then(
                function (na) {
                    usermodel.FindById(id)
                        .then(
                            function (doc) {
                                console.log("user service server - 3");
                                res.json(doc);
                            }
                        ),
                        function (err) {
                            console.log("user service server - 4");
                            res.status(400).send(err);
                        }
                },
                function (err) {
                    console.log("user service server - 5");
                    res.status(400).send(err);
                }
            );

        /*
        var found = usermodel.Update(id, user);
        req.session.currentUser = user;
        res.json(found);
        */
    }

    function deleteUserById(req, res) {
        var id = req.params(id);
        usermodel.Delete(id);
        res.json(usermodel.FindAll());

    }
};