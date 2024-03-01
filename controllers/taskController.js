// controllers/taskController.js
import * as taskService from "../services/taskService.js";

export const taskController = {
  index: async (req, res) => {
    try {
      const tasks = await taskService.getAllTasks();
      res.success(tasks, "Tasks retrieved successfully");
    } catch (error) {
      res.error("Failed to retrieve tasks");
    }
  },

  store: async (req, res) => {
    try {
      const newTask = await taskService.addTask(req.body);
      res.created(newTask, "Task created successfully");
    } catch (error) {
      res.error("Failed to create task");
    }
  },

  update: async (req, res) => {
    try {
      const updatedTask = await taskService.updateTask(req.params.id, req.body);
      if (!updatedTask) {
        return res.notFound("Task not found");
      }
      res.success(updatedTask, "Task updated successfully");
    } catch (error) {
      res.error("Failed to update task");
    }
  },

  show: async (req, res) => {
    try {
      const task = await taskService.getTask(req.params.id);
      if (!task) {
        return res.notFound("Task not found");
      }
      res.success(task);
    } catch (error) {
      res.error("Failed to retrieve task");
    }
  },

  destroy: async (req, res) => {
    try {
      const success = await taskService.deleteTask(req.params.id);
      if (!success) {
        return res.notFound("Task not found");
      }
      res.success(null, "Task deleted successfully");
    } catch (error) {
      res.error("Failed to delete task");
    }
  },
};
