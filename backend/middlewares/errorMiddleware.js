import formatValidationErrors from "../utils/validationsErrorHandler.js";

const errorMiddleware = (err, req, res, next) => {
  const validationError = formatValidationErrors(err);
  if (validationError) {
    return res.status(validationError.status).json(validationError);
  }
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
};

export default errorMiddleware;
