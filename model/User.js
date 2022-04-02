const mongoose = require('mongoose')

const schema = mongoose.Schema({
    id: { type: Number, default: 0, unique: true },
    name: String,
    age: Number
});

module.exports = mongoose.model("Post", schema)