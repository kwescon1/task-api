import * as taskService from "../services/taskService.js";

export const taskController = {
  index: async (req, res) => {
    try {
      const tasks = taskService.getAllTasks();

      return res.success(tasks);
    } catch (error) {
      res.error("Failed to retrieve tasks");
    }
  },

  store: async (req, res) => {
    const { title } = req.body; // Destructure title explicitly

    try {
      const newTask = taskService.addTask({ title });

      return res.created(newTask, "Task created successfully");
    } catch (error) {
      res.error("Failed to create task");
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const updatedTask = taskService.updateTask(id, updateData);

      if (!updatedTask) {
        // task was not found

        return res.notFound("Task not found");
      }

      // Task updated successfully
      return res.success(updatedTask, "Task updated successfully");
    } catch (error) {
      return res.error("Failed to update task");
    }
  },

  show: async (req, res) => {
    const { id } = req.params;

    try {
      const task = taskService.getTask(id);

      if (!task) {
        return res.notFound("Task not found");
      }

      return res.success(task);
    } catch (error) {
      return res.error("Failed to retrieve task");
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params;

    try {
      const success = taskService.deleteTask(id);

      if (!success) {
        return res.notFound("Task not found");
      }

      return res.success(True, "Task deleted successfully");
    } catch (error) {
      return res.error("Failed to delete task");
    }
  },
};
