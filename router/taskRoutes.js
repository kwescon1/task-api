import express from "express";
import { taskController } from "../app/Http/Controllers/TaskController.js";
import { validateTask } from "../requests/TaskRequest.js";

const taskRoutes = express.Router();

// Apply the validateTake request to the controller
taskRoutes.post("/", validateTask, taskController.store);

taskRoutes.get("/", taskController.index);
taskRoutes.put("/:id", taskController.update);
taskRoutes.get("/:id", taskController.show);
taskRoutes.delete("/:id", taskController.destroy);

export default taskRoutes;
