// src/utils/response.js
exports.success = (res, data, message = 'Success', statusCode = 200) => {
    res.status(statusCode).json({ message, data });
  };
  
  exports.error = (res, error, statusCode = 500) => {
    res.status(statusCode).json({ message: error.message || 'Error' });
  };
  