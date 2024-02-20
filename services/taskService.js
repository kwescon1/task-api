// services/taskService.js

import { Task } from "../models/Task.js";

let tasks = []; // In-memory list of tasks
let currentId = 0; // Counter for task IDs

const addTask = ({ title }) => {
  const newTask = new Task(++currentId, title);

  tasks.push(newTask);

  return newTask;
};

const getAllTasks = () => {
  return tasks;
};

const getTask = (id) => {
  return tasks.find((task) => task.id === parseInt(id));
};

const updateTask = (id, updateData) => {
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

  if (taskIndex === -1) return null;

  tasks[taskIndex] = { ...tasks[taskIndex], ...updateData };

  return tasks[taskIndex];
};

const deleteTask = (id) => {
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  if (index === -1) return false;

  tasks.splice(taskIndex, 1); // Remove the task from the array
  return true;
};

export { addTask, getAllTasks, getTask, updateTask, deleteTask };
