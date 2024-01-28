import express from 'express';
import asyncHandler from './../utils/asyncHandler.js';
import { authenticate, restrictTo } from './../middleware/auth.js';
import {
  getUser,
  updateUserData,
  createWriter,
  getReadersCount,
  getWriters,
} from '../controllers/user.js';
import { upload, handleFirebaseUpload } from '../middleware/upload.js';
const router = express.Router();

router.get('/me', asyncHandler(authenticate), asyncHandler(getUser));
router.patch(
  '/update',
  asyncHandler(authenticate),
  upload.single('image'),
  asyncHandler(handleFirebaseUpload('image')),
  asyncHandler(updateUserData),
);

// Any routes after this part will be restricted to admin
router.use(asyncHandler(authenticate), restrictTo('admin'));
router.post('/create-writer', createWriter);
router.get('/readers-count', getReadersCount);
router.get('/writers', getWriters);

export default router;
