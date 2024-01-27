import User from '../models/user.js';
import jwt from 'jsonwebtoken';
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
  const { JWT_SECRET: secret, JWT_EXPIRES_IN: expiresIn } = process.env;
  const token = jwt.sign({ id: newUser.id }, secret, { expiresIn });

  res.status(200).json({
    status: 'success',
    data: { user: newUser },
    token,
  });
};

const login = async (req, res) => {};
const forgotPassword = async (req, res) => {};
const resetPassword = async (req, res) => {};

export { signup, login, forgotPassword, resetPassword };
