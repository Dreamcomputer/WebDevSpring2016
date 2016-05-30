/**
 * Created by Rammer on 5/27/16.
 */

module.exports = function(app) {
    var usermodel = require("./models/user.model.js")();
    var formmodel = require("./models/form.model.js")();

    var userservice = require("./services/user.service.server.js")(app, usermodel);
    var formservice = require("./services/form.service.server.js")(app, formmodel);
    var fieldservice = require("./services/field.service.server.js")(app, usermodel, formmodel);
};
