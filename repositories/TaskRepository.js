import BaseRepository from "./BaseRepository.js";
import Task from "../models/Task.js";

class TaskRepository extends BaseRepository {
  constructor() {
    super(Task);
  }

  // Task-specific methods would go here
}

export default new TaskRepository();
