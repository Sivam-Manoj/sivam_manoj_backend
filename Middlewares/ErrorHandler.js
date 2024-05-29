const ErrorHandler = (err, req, res) => {
  const statusCode = err.code === 200 ? 500 : err.code || 500;

  const response = {
    status: statusCode,
    message: err.message || "internal server error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  };

  res.status(statuscode).json(response);
};
module.exports = {
  ErrorHandler,
};
