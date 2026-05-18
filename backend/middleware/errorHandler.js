export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode || 500;
  const response = {
    success: false,
    message: err.message || 'Server Error'
  };

  if (err.details) {
    response.errors = err.details;
  }

  if (err.name === 'CastError') {
    response.message = 'Invalid resource identifier';
  }

  res.status(statusCode).json(response);
};