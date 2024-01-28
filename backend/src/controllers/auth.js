import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import AppError from './../utils/appError.js';

const createJwtToken = (data) => {
  const { JWT_SECRET: secret, JWT_EXPIRES_IN: expiresIn } = process.env;
  const token = jwt.sign(data, secret, { expiresIn });
  return token;
};

const getSanitizedUser = (user) => {
  return {
    _id: user.id,
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
  const token = createJwtToken({ id: newUser.id });
  // Don't pass on the data
  res.status(201).json({
    status: 'success',
    data: {
      user: getSanitizedUser(newUser),
    },
    token,
  });
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

  const sanitizedUser = getSanitizedUser(user);
  const token = createJwtToken({ id: user.id });
  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: sanitizedUser,
    },
  });
};

const forgotPassword = async (req, res, next) => {};
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

  const token = createJwtToken({ id: user.id });
  const sanitizedUser = getSanitizedUser(user);
  res.status(200).json({
    status: 'success',
    data: {
      user: sanitizedUser,
    },
    token,
  });
};

export { signup, login, forgotPassword, changePassword, getSanitizedUser };
