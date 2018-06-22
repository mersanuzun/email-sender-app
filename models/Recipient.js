const mongoose = require("mongoose");

const schema = mongoose.Schema({
    respond: {type: Boolean, default: false},
    email: String
});

module.exports = schema;