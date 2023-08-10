import AppError from "../exceptions/AppError.js";

export const normalHandler = (req, res, next) => {
  res.status(404).json({ message: "Route not found" });
};

export const errorHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    if (error.httpStatusCode === 418) {
      res.status(error.httpStatusCode).json({
        message: "The server refuses the attempt to brew coffee with a teapot.",
      });
    } else {
      res.status(error.httpStatusCode).json({
        message: error.message,
      });
    }
  } else {
    res.status(500).json({
      message: "Unknown error occurred",
    });
  }
};
