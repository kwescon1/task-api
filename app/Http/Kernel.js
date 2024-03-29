// kernel.js

import express from "express";
import router from "../../routes/index.js";
import { responseMacro } from "./Middleware/Response.js";
import ConvertEmptyStringsToNull from "./Middleware/ConvertEmptyStringsToNull.js";
import PreventRequestsDuringMaintenance from "./Middleware/PreventRequestsDuringMaintenance.js";
import TrimStringsMiddleware from "./Middleware/TrimStrings.js";
import RateLimiter from "./Middleware/RateLimiter.js";
import CorsMiddleware from "./Middleware/HandleCors.js";
// import RequestLogger from "./Middleware/Logger.js";
import ErrorHandler from "../exceptions/Handler.js";

import container from "../../config/container.js";
import AttachContainerMiddleware from "./Middleware/AttachContainer.js";
import { NotFoundException } from "../exceptions/NotFoundException.js";

/**
 * Kernel class for managing and applying middleware in an Express application and configuring app routes.
 */
class Kernel {
  /**
   * Constructs a Kernel instance with the given Express app.
   *
   * @param {Express.Application} app - The Express application instance.
   */
  constructor(app) {
    this.app = app;
  }

  /**
   * Configures and applies a catch-all route for undefined routes.
   */
  handleUndefinedRoutes() {
    this.app.all("*", (req, res, next) => {
      // Throw a NotFoundException for any undefined route
      throw new NotFoundException(
        `Cannot find ${req.originalUrl} on this server.`
      );
    });
  }

  /**
   * Configures and applies cors middleware
   *
   * @param {Object} options - Configuration options for cors
   */
  handleCors(options = {}) {
    const corsMiddleware = new CorsMiddleware().middleware;

    this.app.use(corsMiddleware);
  }

  /**
   * Configures and applies the container middleware to attach the DI container to every request.
   */
  applyContainerMiddleware() {
    return new AttachContainerMiddleware(container).handle;
  }
  /**
   * Configures and applies maintenance mode middleware with exceptions.
   *
   * @param {string[]} exceptPaths - Paths that should bypass maintenance mode.
   */
  handleMaintenanceMode(exceptPaths = []) {
    this.app.use(new PreventRequestsDuringMaintenance(exceptPaths).handle);
  }

  /**
   * Configures and applies rate limiting middleware.
   *
   * @param {Object} options - Configuration options for the rate limiter.
   */
  handleRateLimiting(options = {}) {
    const rateLimiterMiddleware = new RateLimiter({
      windowMs: options.windowMs || 60 * 1000, // 1 minute
      max: options.max || 60, // Default to 60 requests per windowMs
      message: options.message || "Too many requests, please try again later.",
    }).middleware;

    this.app.use(rateLimiterMiddleware);
  }

  /**
   * Applies global middleware to every request.
   */
  globalMiddleware() {
    this.app.use(express.json()); // for parsing application/json
    this.app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    this.handleCors({});
    this.handleRateLimiting({});
    // this.app.use(RequestLogger.handle);
    this.app.use(responseMacro);
    this.handleMaintenanceMode();
    this.app.use(ConvertEmptyStringsToNull.handle);
    this.app.use(new TrimStringsMiddleware().handle);

    // Add more global middleware here
  }

  /**
   * Organizes and applies middleware groups.
   */
  middlewareGroups() {
    // Example: 'web' middleware group
    const webMiddleware = [
      // Middlewares for web requests
    ];

    // Example: 'api' middleware group
    const apiMiddleware = [
      // Middlewares for API requests

      // First, attach the DI container to the request
      this.applyContainerMiddleware(),
    ];

    // Apply middleware groups to specific routes or route groups
    // Implementation depends on how routes are defined

    // Apply API middleware to /api/v1 routes
    this.app.use("/api/v1", apiMiddleware, router);
  }

  /**
   * Initializes and applies all configured middleware.
   */
  configureApplication() {
    // apply global middleware
    this.globalMiddleware();

    this.middlewareGroups();
    // Additional middleware application logic can be added here

    this.handleUndefinedRoutes(); // Handle undefined routes

    // Apply the error handler as the last piece of middleware
    this.app.use(ErrorHandler.handle);
  }
}

export default Kernel;
