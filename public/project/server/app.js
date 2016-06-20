/**
 * Created by Rammer on 6/18/16.
 */

module.exports = function(app, mongoose, db, usermodel) {

    var logmodel = require("./models/log.model.js")(mongoose, db);

    var userservice = require("./services/user.service.server.js")(app, usermodel);
    var logservice = require("./services/log.service.server.js")(app, logmodel);

};
