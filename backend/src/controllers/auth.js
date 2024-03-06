import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import AppError from './../utils/appError.js';

const createJwtToken = (data) => {
  const { JWT_SECRET: secret, JWT_EXPIRES_IN: expiresIn } = process.env;
  const token = jwt.sign(data, secret, { expiresIn });
  return token;
};

/*** Cookies: Small text sent to the browser using server. Browser store this for specified amount of time like we are specifying here.
 * the cookie prevents from cross-site-scripting attacks where it's possible to read the local storage and if the attacker can get the token from local storage then it's quite problematic. That's why it's important to store jwt in httpOnly cookie
 */
const sendJwtToken = (res, user, statusCode) => {
  const token = createJwtToken({ id: user.id });
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ), // when should the browser delete the cookie
    httpOnly: true, // prevents it from being tampered on the browser part
  };
  // secure:true then cookie will be only sent on encrypted connection basically https
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  res.status(statusCode).json({
    status: 'success',
    data: {
      user: getSanitizedUser(user),
    },
  });
};

const getSanitizedUser = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    image: user.image,
  };
};

const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
    role: 'reader',
  });

  // even if you pass extra data the only data which will get stored in the database is the one which is in the schema but
  // if you have empty field then because of schema validation you'll get error
  // Although you may need better way to handle and show that error
  // but it is what it is.
  // it is also a security flaw because of which role can be changed

  // secret should be at least 32 characters long
  sendJwtToken(res, newUser, 201); // if i create a different function where i add cookie in res and then call that function and after calling that we send the response then it doesn't work
  // Don't pass on the data
};

// Only send token at this time
const login = async (req, res, next) => {
  const { email, password } = req.body;
  // Check if they exist or not
  if (!email || !password) {
    // can also use throw error but it will directly go to the global error handling middle ware
    // but if you have only multiple error handling middlewares then next is your go to.
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  const correct = user
    ? await user.comparePassword(password, user.password)
    : false;

  if (!user || !correct)
    return next(new AppError('Incorrect email or password', 401));

  sendJwtToken(res, user, 200);
};

// since i'm using httpOnly cookie it can't be modified or deleted from client side
// So in this case to make sure that user has logged out we are going to send
// a dummy token with small expiration time which will replace the cookie which is used for logging in
const logout = async (req, res) => {
  res.cookie('jwt', 'logged-out', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};

const forgotPassword = async () => {};
const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  const { user } = req;

  if (newPassword !== confirmNewPassword) {
    return next(new AppError('New passwords do not match!', 400));
  }

  const isSame = await user.comparePassword(oldPassword, user.password);

  if (!isSame) return next(new AppError('Current password is wrong!', 401));

  user.password = newPassword;
  user.confirmPassword = confirmNewPassword;
  await user.save();

  sendJwtToken(res, user, 200);
};

export {
  signup,
  login,
  forgotPassword,
  changePassword,
  getSanitizedUser,
  logout,
};
