import dotenv from "dotenv";
dotenv.config();
// import bodyParser from "body-parser";
// bodyParser = require("body-parser");

import express from "express";
import DatabaseConnection from "./config/database.js";
import Kernel from "./app/Http/Kernel.js"; // Import the Kernel class
import router from "./router/index.js";
// import { errorHandler } from "./exceptions/Handler.js";

// application initialization
const app = express();

const mongoUri = process.env.MONGO_URI;

// Instantiate the database connection service
const dbConnection = new DatabaseConnection(mongoUri);

dbConnection.connect();

const kernel = new Kernel(app); // Instantiate Kernel with the app
kernel.applyMiddleware(); // Apply all configured middleware

// Use router
app.use("/api/v1", router);

// app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle graceful shutdown
process.on("SIGINT", async () => {
  await dbConnection.disconnect();
  process.exit(0);
});
