import User from '../models/user.js';
import { getSanitizedUser } from './auth.js';

const getUser = async (req, res) => {
  const { user } = req;
  const sanitizedUser = getSanitizedUser(user);
  console.log(sanitizedUser);
  res.status(200).json({
    status: 'success',
    data: {
      user: sanitizedUser,
    },
  });
};

const updateUserData = async (req, res) => {
  // we can add email but it has more complications
  const { name, image } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name,
      image,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  const sanitizedUser = getSanitizedUser(updatedUser);
  res.status(200).json({
    status: 'success',
    data: {
      user: sanitizedUser,
    },
  });
};

const createWriter = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const writer = await User.create({
    name,
    email,
    password,
    confirmPassword,
    role: 'writer',
  });

  res.status(201).json({
    status: 'success',
    data: {
      writer: getSanitizedUser(writer),
    },
  });
};
// Modify it to provide according to role and admin
const getReadersCount = async (req, res) => {
  const readers = await User.find({ role: 'reader' });

  res.status(200).json({
    status: 'success',
    data: {
      numberOfReader: readers.length,
    },
  });
};

const getWriters = async (req, res) => {
  const writers = await User.find({ role: 'writer' });
  res.status(200).json({
    status: 'success',
    data: {
      numberOfWriters: writers.length,
      writers,
    },
  });
};

export { getUser, updateUserData, createWriter, getReadersCount, getWriters };
