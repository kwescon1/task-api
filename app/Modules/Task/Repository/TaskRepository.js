import BaseRepository from "../../Base/Repository/BaseRepository.js";
import Task from "../../../Models/Task.js";

class TaskRepository extends BaseRepository {
  constructor() {
    super(Task);
  }

  // Task-specific methods would go here
}

export default new TaskRepository();
