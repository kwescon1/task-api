// Import the logger
import logger from "../../../config/logging.js";

/**
 * Middleware class for logging HTTP requests.
 */
class RequestLogger {
  /**
   * Middleware handler to log incoming requests.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Callback to pass control to the next middleware function.
   */
  handle(req, res, next) {
    // Log the HTTP method and original URL of the request
    logger.info(`${req.method} ${req.originalUrl}`);
    next(); // Proceed to the next middleware in the stack
  }
}

// Export the RequestLogger class
export default new RequestLogger();
