# Task Management API

This Task Management API is a robust, Express.js-based backend application designed for efficient task management. It offers comprehensive RESTful endpoints for adding, retrieving, updating, and deleting tasks, serving as an integral backend for any frontend system or service that requires task management capabilities.

## Features

- **Task Operations**: Supports creating, retrieving, updating, and deleting tasks.
- **Completion Tracking**: Allows marking tasks as completed or incomplete.
- **Persistence**: Utilizes MongoDB for storing task data persistently.
- **Validation**: Implements input validation to ensure data integrity.
- **Dockerization**: Containerized with Docker for easy deployment and environment consistency.
- **Environment Management**: Uses `.env` files for secure and flexible configuration.
- **Ease of Setup**: Simplified project setup and management with Makefile commands.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing.

### Prerequisites

- Docker and Docker Compose
- Node.js (v14.x or later recommended)
- npm (v6.x or later recommended) or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/kwescon1/task-api.git
cd task-api
```

2. **Set up environment variables**

Copy the `.env.example` file to a new file named `.env` and adjust the variables to your needs.

3. **Start the application using Make**

The included Makefile simplifies the setup and development process. Use the following commands as needed:

- `make setup` to prepare and start the project.
- `make fresh` to rebuild and restart containers.
- `make teardown` to stop and remove containers and volumes.

```bash
make setup
```

The API server and MongoDB instance will start up. By default, the server listens on `http://localhost:3000/`.

## Usage

### Endpoints

- **GET `/api/v1/tasks`**: Fetch all tasks.
- **POST `/api/v1/tasks`**: Create a new task. Requires a `title` in the request body.
- **GET `/api/v1/tasks/:id`**: Get a specific task by ID.
- **PUT `/api/v1/tasks/:id`**: Update an existing task by ID.
- **DELETE `/api/v1/tasks/:id`**: Delete a task by ID.

### Request & Response Examples

**Creating a Task**

Request:

```json
POST /api/v1/tasks
Content-Type: application/json

{
  "title": "Finish writing README"
}
```

Response:

```json
{
  "id": "1",
  "title": "Finish writing README",
  "completed": false,
  "createdAt": "2024-03-01T12:00:00.000Z"
}
```

## Development

### Using Docker for Development

Docker is used to containerize the application and MongoDB, ensuring a consistent development environment. Changes in the application code will automatically restart the server, thanks to Docker volumes mapping and the use of Makefile commands for easy management.

### Debugging and Testing

For debugging, attach to the Docker container's process. Use Postman or any other API testing tool to test the endpoints.

## Contributing

Contributions are highly appreciated. Please fork the repository, create a feature branch, and submit your pull request for review.

## License

This project is open-sourced under the MIT License. See the [LICENSE](LICENSE) file for more details.
