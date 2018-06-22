const mongoose = require("mongoose");
const RecipientSchema = require("./Recipient");

const surveySchema = mongoose.Schema({
    title: String,
    subject: String,
    body: String,
    recipients: [RecipientSchema],
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0},
    dateSent: Date,
    lastResponde: Date
});

module.exports = mongoose.model("Survey", surveySchema);