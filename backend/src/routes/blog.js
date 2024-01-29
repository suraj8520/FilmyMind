import express from 'express';
import commentRouter from './comment.js';
import {
  createBlog,
  deleteBlog,
  editBlog,
  getPublishedBlog,
  getDraft,
  checkBlogAuthor,
  getMyBlogs,
  publishBlog,
  getAllBlogs,
  saveDraft,
} from '../controllers/blog.js';
import asyncHandler from '../utils/asyncHandler.js';
import { authenticate, restrictTo } from '../middleware/auth.js';
import { upload, handleFirebaseUpload } from '../middleware/upload.js';

const router = express.Router();

router.use('/:blogId/comments', commentRouter);

router.get('/:blogId', asyncHandler(getPublishedBlog));

// TO GET ALL THE BLOGS = FOR ADMIN
router.patch(
  '/all',
  asyncHandler(authenticate),
  restrictTo('admin'),
  asyncHandler(getAllBlogs),
);

// ALL THE SUBSEQUENT ROUTES WILL BE ONLY FOR AUTHENTICATED WRITERS
router.use(asyncHandler(authenticate), restrictTo('writer'));
router.get(
  '/my-blogs',
  asyncHandler(checkBlogAuthor),
  asyncHandler(getMyBlogs),
);
router.post('/create', asyncHandler(createBlog));
router
  .route('/:blogId')
  .patch(
    asyncHandler(checkBlogAuthor),
    upload.single('coverImage'),
    asyncHandler(handleFirebaseUpload('coverImage')),
    asyncHandler(editBlog),
  )
  .delete(asyncHandler(checkBlogAuthor), asyncHandler(deleteBlog));

router
  .route('/draft/:blogId')
  .get(asyncHandler(checkBlogAuthor), asyncHandler(getDraft))
  .patch(asyncHandler(checkBlogAuthor), asyncHandler(saveDraft));

router.patch(
  '/publish/:blogId',
  asyncHandler(checkBlogAuthor),
  asyncHandler(publishBlog),
);

export default router;
