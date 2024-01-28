import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { authenticate } from './../middleware/auth.js';
import { signup, login, changePassword } from './../controllers/auth.js';
const router = express.Router();

router.post('/signup', asyncHandler(signup));
router.post('/login', asyncHandler(login));
router.patch(
  '/reset-password',
  asyncHandler(authenticate),
  asyncHandler(changePassword),
);

export default router;
