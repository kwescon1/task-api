import logger from "../../../config/logging.js";
/**
 * Class representing the controller for task operations.
 * This controller handles all task-related HTTP requests.
 */
class TaskController {
  /**
   * TaskController constructor.
   * Injects TaskService for handling the business logic.
   * @param {TaskService} taskService - The service for task operations.
   */
  constructor({ taskService }) {
    this.taskService = taskService;
  }

  /**
   * Handles the request to list all tasks.
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   */
  async index(req, res) {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.success(tasks, "Tasks retrieved successfully");
    } catch (error) {
      res.error("Failed to retrieve tasks", error);
    }
  }

  /**
   * Handles the request to create a new task.
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   */
  async store(req, res) {
    try {
      const newTask = await this.taskService.addTask(req.body);
      res.created(newTask, "Task created successfully");
    } catch (error) {
      res.error("Failed to create task", error);
    }
  }

  /**
   * Handles the request to update an existing task.
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   */
  async update(req, res) {
    try {
      const updatedTask = await this.taskService.updateTask(
        req.params.id,
        req.body
      );
      if (!updatedTask) {
        return res.notFound("Task not found");
      }
      res.success(updatedTask, "Task updated successfully");
    } catch (error) {
      res.error("Failed to update task", error);
    }
  }

  /**
   * Handles the request to retrieve a single task by its ID.
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   */
  async show(req, res) {
    try {
      const task = await this.taskService.getTask(req.params.id);
      if (!task) {
        return res.notFound("Task not found");
      }
      res.success(task);
    } catch (error) {
      logger.error(error);
      res.error("Failed to retrieve task", error);
    }
  }

  /**
   * Handles the request to delete a task by its ID.
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   */
  async destroy(req, res) {
    try {
      const success = await this.taskService.deleteTask(req.params.id);
      if (!success) {
        return res.notFound("Task not found");
      }
      res.success(null, "Task deleted successfully");
    } catch (error) {
      res.error("Failed to delete task", error);
    }
  }
}

export default TaskController;
