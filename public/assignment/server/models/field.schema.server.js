/**
 * Created by Rammer on 6/4/16.
 */

module.exports = function(mongoose) {

    var FieldSchema = mongoose.Schema({
        label: String,
        type: String,
        placeholder: String,
        options: [{label:String, value: String}]
    }, {collection: 'field'});
    return FieldSchema;
};