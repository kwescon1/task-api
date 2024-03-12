import mongoose from "mongoose";
import { taskSchema } from "../../database/schemas/task_schema.js";

const Task = mongoose.model("Task", taskSchema);

export default Task;
