import express from "express";
import { validateTask } from "../requests/TaskRequest.js";

// Create a new router instance.
const taskRoutes = express.Router();

// Middleware to attach the taskController to the request.
taskRoutes.use((req, res, next) => {
  // Resolve taskController from the DI container attached to the request.
  req.taskController = req.container.resolve("taskController");
  next();
});

// Route to create a new task.
taskRoutes.post("/", validateTask, (req, res) =>
  req.taskController.store(req, res)
);

// Route to retrieve all tasks.
taskRoutes.get("/", (req, res) => req.taskController.index(req, res));

// Route to update a task by ID.
taskRoutes.put("/:id", (req, res) => req.taskController.update(req, res));

// Route to retrieve a single task by ID.
taskRoutes.get("/:id", (req, res) => req.taskController.show(req, res));

// Route to delete a task by ID.
taskRoutes.delete("/:id", (req, res) => req.taskController.destroy(req, res));

export default taskRoutes;
