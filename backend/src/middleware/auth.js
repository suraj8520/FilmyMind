import { promisify } from 'util';
import AppError from '../utils/appError.js';
import jwt from 'jsonwebtoken';
import User from './../models/user.js';

const authenticate = async (req, res, next) => {
  // The headers are not present
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    return next(new AppError('You are not logged in! Try logging in again!'));
  }

  // headers are present but may be invalid or expired
  const token = req.headers.authorization.split(' ')[1];

  // Jwt takes 3 arguments and they are token, jwtsecret and a callback function which will run when it has been verified
  //so instead of providing callback function we can promisify and run it.
  // Main reason for promisifying it simple => to fit it into async/await method
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // check here for that.
  // There are chances that the token are valid but the user doesn't exist
  const user = await User.findById(decoded.id).select('+password');
  if (!user) {
    return next(new AppError("User doesn't exist!", 401));
  }
  // Check if user changed password after the issue of token
  const passwordChanged = user.passwordChangedAfter(decoded.iat);
  if (passwordChanged) {
    return next(new AppError('Login again! Session Expired!', 401));
  }

  req.user = user;
  next();
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user?.role)) {
      return next();
    }
    return next(new AppError('You are not authorized!', 401));
  };
};

export { authenticate, restrictTo };
