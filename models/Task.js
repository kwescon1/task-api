export class Task {
  constructor(id, title, completed = false) {
    this.id = id;
    this.title = title;
    this.createdAt = new Date();
    this.completed = completed;
  }
}
