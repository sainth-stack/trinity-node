const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    project: {
        type: String,
        required: true,
    },
    task: {
        type: String,
        required: true,
    },
    inDate: {
        type: String,
        required: true
    },
    outDate: {
        type: String,
        required: false
    },
    duration: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model("timesheet", Schema);
