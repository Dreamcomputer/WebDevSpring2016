/**
 * Created by Rammer on 6/18/16.
 */


module.exports = function(mongoose) {

    var LogSchema = mongoose.Schema({
        userId: String,
        content: Buffer,
        name: String,
        date: { "type": Date, "default": Date.now },
        note: String
    }, {collection: 'log'});
    return LogSchema;
}