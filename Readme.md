# Task Management API

This Task Management API is a simple, yet powerful Express-based backend application designed to manage tasks efficiently and effectively. It provides endpoints for creating, retrieving, updating, and deleting tasks, making it a versatile tool for any frontend application or service requiring task management functionality.

## Features

- **Create Tasks**: Add new tasks with titles and automatically track their creation dates.
- **List Tasks**: Retrieve all tasks with their details.
- **Update Tasks**: Modify the details of existing tasks.
- **Delete Tasks**: Remove tasks from the system.
- **Task Completion Status**: Mark tasks as completed or revert them to incomplete.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v12.x or later recommended)
- npm (v6.x or later recommended)

### Installation

1. **Clone the repository**

```sh
git clone https://github.com/yourusername/your-task-api-repo.git
cd your-task-api-repo
```

2. **Install dependencies**

```sh
npm install
```

3. **Start the application**

```sh
npm start
```

The server will start on `http://localhost:3000/`.

## Usage

### Endpoints

- **GET `/api/v1/tasks`**: Retrieve all tasks.
- **POST `/api/v1/tasks`**: Create a new task. Requires a JSON body with a `title` field.
- **GET `/api/v1/tasks/:id`**: Retrieve a specific task by its ID.
- **PUT `/api/v1/tasks/:id`**: Update a task by its ID. Accepts a JSON body with the fields to update.
- **DELETE `/api/v1/tasks/:id`**: Delete a task by its ID.

### Examples

**Creating a Task**

Request:

```json
POST /api/v1/tasks
Content-Type: application/json

{
  "title": "Complete the project documentation"
}
```

Response:

```json
{
  "id": 1,
  "title": "Complete the project documentation",
  "completed": false,
  "createdAt": "2024-02-20T01:26:43.338Z"
}
```

## Development

### Running with Nodemon

For development, you can use Nodemon to automatically restart the server upon changes:

```sh
npm run dev
```

Ensure you've installed Nodemon as a dev dependency:

```sh
npm install nodemon --save-dev
```

And have the following script in your `package.json`:

```json
"scripts": {
  "dev": "nodemon app.js"
}
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open issues to suggest improvements or add new features.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.
