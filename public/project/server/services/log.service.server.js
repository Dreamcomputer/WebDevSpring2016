/**
 * Created by Rammer on 6/18/16.
 */


module.exports = function(app, logmodel) {
    app.post("/api/assignment/user/:userId/check", createNewCheckForUserId);
    app.get("/api/assignment/user/:userId/check", findAlllogsForUserId);




    function createNewCheckForUserId(req, res) {
        var userId = req.params.userId;
        var check = req.body;
        var newcheck = logmodel.createNewCheckforUserId(userId, check);
        res.json(newcheck);
    }

    function findAlllogsForUserId(req, res) {
        var userId = req.params.userId;
        logmodel.findAlllogsForUserId(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
            function (err) {
                res.status(400).send(err);
            }
            );
    }





};