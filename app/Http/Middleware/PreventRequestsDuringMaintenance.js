/**
 * Middleware to prevent requests during maintenance mode except for specified URIs.
 */
class PreventRequestsDuringMaintenance {
  /**
   * Constructs a PreventRequestsDuringMaintenance instance.
   *
   * @param {string[]} [except=[]] - Array of URIs that should be reachable while maintenance mode is enabled.
   */
  constructor(except = []) {
    this.except = except;
    /**
     * Binds the handle method to the current instance of the class.
     * This ensures that when the handle method is called as a callback,
     * 'this' within the handle method correctly refers to the class instance.
     * This binding is crucial for accessing instance properties and methods
     * (like 'this.except' in our case) safely within the handle method,
     * especially when it's used in contexts where 'this' might otherwise
     * refer to a different object (e.g., as middleware in Express).
     */
    this.handle = this.handle.bind(this);
  }

  /**
   * Handles incoming requests to prevent access during maintenance, except for specified URIs.
   *
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Callback to pass control to the next middleware function.
   */
  handle(req, res, next) {
    // Assume maintenance mode status is stored in an environment variable
    const isMaintenanceMode = process.env.APP_MAINTENANCE_MODE === "true";

    // Check if the current URI is in the list of exceptions
    if (this.except.includes(req.path)) {
      next(); // Allow request to proceed
      return;
    }

    if (isMaintenanceMode) {
      // Use the `serviceUnavailable` method from the responseMacro middleware
      res.serviceUnavailable(
        "The site is currently down for maintenance. Please try again later."
      );
    } else {
      next(); // Proceed to the next middleware if not in maintenance mode
    }
  }
}

export default PreventRequestsDuringMaintenance;
