import dotenv from "dotenv";
dotenv.config();
// import bodyParser from "body-parser";
// bodyParser = require("body-parser");

import express from "express";
import DatabaseConnection from "./services/db/DatabaseService.js";
import { responseMacro } from "./middlewares/responseMacro.js";
import router from "./router/index.js";

// application initialization
const app = express();

const mongoUri = process.env.MONGO_URI;

// Instantiate the database connection service
const dbConnection = new DatabaseConnection(mongoUri);

dbConnection.connect();

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(bodyParser({ extended: false }));
app.use(responseMacro);

// Use router
app.use("/api/v1", router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle graceful shutdown
process.on("SIGINT", async () => {
  await dbConnection.disconnect();
  process.exit(0);
});
