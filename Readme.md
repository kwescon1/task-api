To reflect the enhancements made to the Task Management API, including the addition of command-line utilities for generating schemas and associated models, the README can be updated as follows:

# Task Management API

This Task Management API is a robust, Express.js-based backend application designed for efficient task management. It features comprehensive RESTful endpoints for adding, retrieving, updating, and deleting tasks, serving as an integral backend for any frontend system or service that requires task management capabilities.

## Features

- **Task Operations**: Supports creating, retrieving, updating, and deleting tasks.
- **Completion Tracking**: Allows marking tasks as completed or incomplete.
- **Persistence**: Utilizes MongoDB for storing task data persistently.
- **Validation**: Implements input validation to ensure data integrity.
- **Dockerization**: Containerized with Docker for easy deployment and environment consistency.
- **Environment Management**: Uses `.env` files for secure and flexible configuration.
- **Ease of Setup**: Simplified project setup and management with Makefile commands.
- **Schema and Model Generation**: Includes a command-line interface (CLI) for generating schemas and models, simplifying development.

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

Use the following Makefile commands as needed:

- `make setup` to prepare and start the project.
- `make fresh` to rebuild and restart containers.
- `make teardown` to stop and remove containers and volumes.

```bash
make setup
```

The API server and MongoDB instance will start up. By default, the server listens on `http://localhost:3000/`.

## Usage

### Generating Schemas and Models

You can generate new MongoDB schemas and associated models using the CLI included in this project. This utility simplifies the development process by providing an easy way to scaffold new schemas and models with pre-defined templates.

**Generate a Schema**

```bash
npm run artisan -- make:schema Task --model
```

This command creates a new schema for tasks and also generates an associated model file.

**Generate a Schema Only**

```bash
npm run artisan -- make:schema Task
```

This command creates a new schema file for tasks without generating a model.

### Endpoints

- **GET `/api/v1/tasks`**: Fetch all tasks.
- **POST `/api/v1/tasks`**: Create a new task. Requires a `title` in the request body.
- **GET `/api/v1/tasks/:id`**: Get a specific task by ID.
- **PUT `/api/v1/tasks/:id`**: Update an existing task by ID.
- **DELETE `/api/v1/tasks/:id`**: Delete a task by ID.

## Development

The application and MongoDB are containerized using Docker, ensuring a consistent development environment. The project includes Makefile commands for easy setup and management.

## Contributing

Contributions are highly appreciated. Please fork the repository, create a feature branch, and submit your pull request for review.

## License

This project is open-sourced under the MIT License. See the [LICENSE](LICENSE) file for more details.
