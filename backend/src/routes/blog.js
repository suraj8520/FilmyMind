import express from 'express';
import commentRouter from './comment.js';
import {
  createBlog,
  deleteBlog,
  editBlog,
  getBlog,
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
// PUTTING IT BEFORE ROUTER.GET('/:BLOGID) OTHERWISE ALL WILL BE CONSIDERED A PARAMETER
// TO GET ALL THE BLOGS = FOR ADMIN
router.all(
  '/all',
  asyncHandler(authenticate),
  restrictTo('admin'),
  asyncHandler(getAllBlogs),
);

router.get(
  '/my-blogs',
  asyncHandler(authenticate),
  restrictTo('writer'),
  asyncHandler(getMyBlogs),
);

router.get('/:blogId', asyncHandler(getBlog));

// ALL THE SUBSEQUENT ROUTES WILL BE ONLY FOR AUTHENTICATED WRITERS
router.use(asyncHandler(authenticate), restrictTo('writer'));
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
  .route('/drafts/:blogId')
  .get(asyncHandler(checkBlogAuthor), asyncHandler(getDraft))
  .patch(asyncHandler(checkBlogAuthor), asyncHandler(saveDraft));

router.patch(
  '/publish/:blogId',
  asyncHandler(checkBlogAuthor),
  upload.single('coverImage'),
  asyncHandler(handleFirebaseUpload('coverImage')),
  asyncHandler(publishBlog),
);

export default router;
