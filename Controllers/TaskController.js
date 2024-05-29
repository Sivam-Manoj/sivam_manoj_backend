const Task = require("../Models/TaskModel");
const asyncHandler = require("express-async-handler");

const getTask = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const tasks = await Task.find({ user: userId });

  if (tasks.length > 0) {
    res.status(200).json(tasks);
  } else {
    res.status(400).json({
      message: "No tasks published",
    });
  }
});

const addTask = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const userId = req.user._id;
  if (!text) {
    return res.status(400).json({ message: "Please provide a task text" });
  }

  try {
    const userTask = new Task({
      user: userId,
      text,
    });

    await userTask.save();
    return res.status(200).json({ message: "Task added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = {
  getTask,
  addTask,
};
