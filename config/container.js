import { createContainer, asClass, asValue, asFunction } from "awilix";

// Import your modules
import TaskService from "../app/Modules/Task/Service/TaskService.js";
import TaskRepository from "../app/Modules/Task/Repository/TaskRepository.js";
import TaskController from "../app/Http/Controllers/taskController.js";

// Initialize the container
const container = createContainer();

container.register({
  // Register classes with the container
  taskService: asClass(TaskService).scoped(),
  taskRepository: asClass(TaskRepository).scoped(),
  taskController: asClass(TaskController).scoped(),
});

export default container;
