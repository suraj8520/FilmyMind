import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { authenticate } from './../middleware/auth.js';
import {
  signup,
  login,
  logout,
  changePassword,
} from './../controllers/auth.js';
const router = express.Router();

router.post('/signup', asyncHandler(signup));
router.post('/login', asyncHandler(login));
router.get('/logout', asyncHandler(logout));
router.patch(
  '/reset-password',
  asyncHandler(authenticate),
  asyncHandler(changePassword),
);

export default router;
