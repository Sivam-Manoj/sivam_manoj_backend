const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
