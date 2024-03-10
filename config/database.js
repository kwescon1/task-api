// Database connection
import mongoose from "mongoose";

class DatabaseConnection {
  constructor(databaseUri) {
    this.databaseUri = databaseUri;
  }

  async connect() {
    try {
      await mongoose.connect(this.databaseUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error("Could not connect to MongoDD", err);
      process.exit(1); // Optionally exit process if cannot connect
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB");
    } catch (err) {
      console.error("Error disconnecting from MongoDB", err);
    }
  }
}

export default DatabaseConnection;
