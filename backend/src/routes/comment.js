import express from 'express';
import { authenticate, restrictTo } from '../middleware/auth.js';
import asyncHandler from '../utils/asyncHandler.js';
import {
  createComment,
  deleteComment,
  editComment,
  getCommentsCount,
} from '../controllers/comment.js';

// Preserve the parent params values
const router = express.Router({ mergeParams: true });

//check for all routes whether it is authenticated or not and allow the access to create, update, delete if authenticated
router.use(asyncHandler(authenticate));
router.post('/create', asyncHandler(createComment));
router.patch('/:commentId/edit', asyncHandler(editComment));
router.delete('/:commentId/delete', asyncHandler(deleteComment));

router.use(restrictTo('admin'));
router.get('/comments-count', asyncHandler(getCommentsCount));

export default router;
