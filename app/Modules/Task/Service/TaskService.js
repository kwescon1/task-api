// import { NotFoundException } from "../exceptions/NotFoundException.js";
// services/taskService.js
import logger from "../../../../config/logging.js";
import TaskRepository from "../Repository/TaskRepository.js";

const addTask = async (data) => {
  return TaskRepository.create(data);
};

const getAllTasks = async () => {
  return TaskRepository.findAll();
};

const getTask = async (id) => {
  var task = await TaskRepository.findById(id);

  if (!task) {
    logger.info("item not found");
    // throw new NotFoundException("Task Not Found");
  }

  return task;
};

const updateTask = async (id, data) => {
  return TaskRepository.update(id, data);
};

const deleteTask = async (id) => {
  return TaskRepository.delete(id);
};

export { addTask, getAllTasks, getTask, updateTask, deleteTask };
