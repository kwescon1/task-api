import dotenv from "dotenv";
dotenv.config();

import express from "express";
import DatabaseConnection from "./config/database.js";
import Kernel from "./app/Http/Kernel.js"; // Import the Kernel class

// application initialization
const app = express();

const mongoUri = process.env.MONGO_URI;

// Instantiate the database connection service
const dbConnection = new DatabaseConnection(mongoUri);

dbConnection.connect();

const kernel = new Kernel(app); // Instantiate Kernel with the app
kernel.configureApplication(); // Apply all configured middleware

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle graceful shutdown
process.on("SIGINT", async () => {
  await dbConnection.disconnect();
  process.exit(0);
});
