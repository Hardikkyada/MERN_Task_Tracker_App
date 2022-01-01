const mongooose = require("mongoose");

// User Schema
const userSchema = mongooose.Schema({
    id: String,
    text: String,
    day: String,
    remider: Boolean,
});

const TaskData = mongooose.model("Task", userSchema, "Task");

module.exports = TaskData;