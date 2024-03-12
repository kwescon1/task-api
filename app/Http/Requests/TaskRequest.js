import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export const validateTask = [
  // Title is required and must be a string
  body("title")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title is required.")
    .isString()
    .withMessage("Title must be a string."),

  // Custom middleware to check the validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors.array().map((error) => error.msg);

      return res.status(StatusCodes.BAD_REQUEST).json({ errors: messages });
    }
    next();
  },
];
