/**
 *  Middleware class to trim string values in the request body, excluding specified fields
 */
class TrimStringsMiddleware {
  /**
   * Constructs a TrimStringsMiddlewre instance
   *
   * @param {string[]} [except=['current_password', 'password', 'password_confirmation']] -
   *          Array of field names that should not be trimmed
   */
  constructor(
    except = ["current_password", "password", "password_confirmation"]
  ) {
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
   * Handles the request by trimming string values in the request body, excluding the fields specified in the `except` array.
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Callback to pass control to the next middleware function
   */
  handle(req, res, next) {
    // Iterate over each key in the request body
    Object.keys(req.body).forEach((key) => {
      // Check if the current key is not in the list of exceptions and if its value is a string
      if (!this.except.includes(key) && typeof req.body[key] === "string") {
        // Trim the string value of the key
        req.body[key] = req.body[key].trim();
      }
    });
    // Proceed to the next middleware in the stack
    next();
  }
}

// Export the TrimStringsMiddleware class for use in the application
export default TrimStringsMiddleware;
