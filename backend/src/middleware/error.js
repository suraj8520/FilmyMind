// This is error handling middle ware and error handling middle ware gets error as well req, res, next
// and we can get the error here.
// and never remove anyof the parameter just because it isn't being used
// based on the number of parameters express identifies that it is a global error handling middleware.
/* eslint-disable no-unused-vars */

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log('Error: ', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(err, res);
  }
};

export default errorHandler;
