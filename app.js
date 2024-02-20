import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { responseMacro } from "./middlewares/responseMacro.js";
import router from "./router/index.js";

// application initialization
const app = express();

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(responseMacro);

// Use router
app.use("/api/v1", router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
