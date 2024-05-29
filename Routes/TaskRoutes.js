const express = require("express");
const { protect } = require("../Middlewares/AuthMiddleware");
const router = express.Router();
const { getTask, addTask } = require("../Controllers/TaskController");

// Define routes separately and chain them
router.get("/get-task", protect, getTask);
router.post("/add-task", protect, addTask);

module.exports = router;
