// Import the logger for logging purposes
import logger from "../../../../config/logging.js";
import { NotFoundException } from "../../../exceptions/NotFoundException.js";

/**
 * Represents the service for managing tasks.
 * Encapsulates the business logic for task operations and communicates with the task repository.
 */
class TaskService {
  /**
   * Initializes a new instance of the TaskService class with injected dependencies.
   * @param {TaskRepository} taskRepository - The repository for task data operations.
   */
  constructor({ taskRepository }) {
    /**
     * The task repository instance.
     * @type {TaskRepository}
     */
    this.taskRepository = taskRepository;
  }

  /**
   * Creates a new task with the provided data.
   * @param {Object} data - The data for the new task.
   * @returns {Promise<Object>} A promise that resolves to the created task.
   */
  async addTask(data) {
    return this.taskRepository.create(data);
  }

  /**
   * Retrieves all tasks.
   * @returns {Promise<Array>} A promise that resolves to an array of tasks.
   */
  async getAllTasks() {
    return this.taskRepository.findAll();
  }

  /**
   * Retrieves a task by its ID.
   * @param {string} id - The ID of the task to retrieve.
   * @returns {Promise<Object|null>} A promise that resolves to the found task or null if not found.
   */
  async getTask(id) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundException("Task Not Found");
    }
    return task;
  }

  /**
   * Updates a task by its ID with the given data.
   * @param {string} id - The ID of the task to update.
   * @param {Object} data - The new data for the task.
   * @returns {Promise<Object>} A promise that resolves to the updated task.
   */
  async updateTask(id, data) {
    return this.taskRepository.update(id, data);
  }

  /**
   * Deletes a task by its ID.
   * @param {string} id - The ID of the task to delete.
   * @returns {Promise<boolean>} A promise that resolves to true if the task was successfully deleted, false otherwise.
   */
  async deleteTask(id) {
    return this.taskRepository.delete(id);
  }
}

export default TaskService;
