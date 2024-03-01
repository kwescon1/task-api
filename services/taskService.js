// services/taskService.js
import TaskRepository from "../repositories/TaskRepository.js";

const addTask = async (data) => {
  return TaskRepository.create(data);
};

const getAllTasks = async () => {
  return TaskRepository.findAll();
};

const getTask = async (id) => {
  return TaskRepository.findById(id);
};

const updateTask = async (id, data) => {
  return TaskRepository.update(id, data);
};

const deleteTask = async (id) => {
  return TaskRepository.delete(id);
};

export { addTask, getAllTasks, getTask, updateTask, deleteTask };
