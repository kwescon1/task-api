//middleware/responseMacro.js // define app responses

import { StatusCodes } from "http-status-codes";

export function responseMacro(req, res, next) {
  res.success = (data, message = "") => {
    return res.status(StatusCodes.OK).json({
      data: data ?? null,
    });
  };

  res.created = (data, message = "Created") => {
    return res.status(StatusCodes.CREATED).json({
      message,
      data: data ?? null,
    });
  };

  res.notFound = (error) => {
    return res.status(StatusCodes.NOT_FOUND).json({
      error,
    });
  };

  res.error = (error, statusCode = StatusCodes.INTERNAL_SERVER_ERROR) => {
    return res.status(statusCode).json({
      error,
    });
  };

  next();
}
