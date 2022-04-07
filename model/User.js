const mongoose = require('mongoose')
var autoIncrement = require('mongoose-sequence')(mongoose)


// in this schema, name is not unique because it does not make sense for it to be unique, 
// as two persons can easily be the same age and share the same name.
const schema = new mongoose.Schema({
    userID: { type: Number, required: false, unique: true, sparse: true },
    name: { type: String, required: true, unique: false, spare: true },
    age: { type: Number, required: true, unique: false, sparse: true }
});
schema.plugin(autoIncrement, { id: 'order_seq', inc_field: 'userID' }) // handles auto incrementing in "counters" collection

module.exports = mongoose.model("User", schema)
