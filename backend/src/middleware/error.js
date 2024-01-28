// This is error handling middle ware and error handling middle ware gets error as well req, res, next
// and we can get the error here.
// and never remove anyof the parameter just because it isn't being used
// based on the number of parameters express identifies that it is a global error handling middleware.
/* eslint-disable no-unused-vars */

import { MongoServerError } from 'mongodb';
import AppError from '../utils/appError.js';
import { MongooseError } from 'mongoose';

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

const handleInvalidJwtError = () =>
  new AppError('Invalid token! Try logging in again!', 401);

const handleExpiredJwtError = () =>
  new AppError('Your session has expired! Log in again!', 401);

const handleMongoServerError = (err) => {
  if (err.code === 11000) {
    const key = Object.keys(err.keyValue)[0];
    const value = err.keyValue[key];
    return new AppError(
      `${value} for ${key} already exists! try a different one!`,
      409,
    );
  }
};

const handleMongooseError = (err) => {
  let message;
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join('. ');
    // THis is the case for invalid object id
  } else if (err.name === 'CastError') {
    message = `Invalid value ${err.value} provided for ${err.path}`;
  }
  return new AppError(message, 400);
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  // console.log(err instanceof MongoServerError);
  // console.log(err instanceof MongooseError);
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    // handle the errors using instance method only
    if (err instanceof MongoServerError) err = handleMongoServerError(err);
    if (err instanceof MongooseError) err = handleMongooseError(err);
    if (err.name === 'JsonWebTokenError') err = handleInvalidJwtError();
    if (err.name === 'TokenExpiredError') err = handleExpiredJwtError();
    sendErrorProd(err, res);
  }
};

export default errorHandler;
