const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Task = require("../models/task");

const router = express.Router();

// Get all tasks for the authenticated user
router.get("/tasks", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/tasks", authMiddleware, async (req, res) => {
  try {
    const { title, description, category, tags, status, priority, dueDate } = req.body;
    const userId = req.user.id; // Get user from the token

    const newTask = new Task({
      title,
      description,
      category,
      tags,
      status,
      priority,  // Add priority to the task
      dueDate,   // Add dueDate to the task
      user: userId,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});











router.put("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, category, tags, status, priority, dueDate } = req.body;
    
    // Find and update the task by its ID
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, category, tags, status, priority, dueDate }, // Ensure new fields are included
      { new: true } // Return the updated task
    );
    
    // If the task doesn't exist
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Respond with the updated task
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});










// Delete a task
router.delete("/tasks/:id", authMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;