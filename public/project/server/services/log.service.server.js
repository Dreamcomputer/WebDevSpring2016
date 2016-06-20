/**
 * Created by Rammer on 6/18/16.
 */


module.exports = function(app, logmodel) {
    app.post("/api/assignment/user/:userId/check", createNewCheckForUserId);




    function createNewCheckForUserId(req, res) {
        console.log("so reached here TOOO??HMMMMM");
        var userId = req.params.userId;
        var check = req.body;
        var newcheck = logmodel.createNewCheckforUserId(userId, check);
        res.json(newcheck);
    }

};