import express from 'express';
import commentRouter from './comment.js';
import {
  createDraft,
  deleteBlog,
  editBlog,
  getBlog,
  getDraft,
  checkBlogAuthor,
  getMyBlogs,
  publishBlog,
  getAllBlogs,
  saveDraft,
  getImageUrl,
  getAuthorsBlogs,
  getDrafts,
} from '../controllers/blog.js';
import asyncHandler from '../utils/asyncHandler.js';
import { authenticate, restrictTo } from '../middleware/auth.js';
import { upload, handleFirebaseUpload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', asyncHandler(getAllBlogs));
router.use('/:blogId/comments', commentRouter);
// PUTTING IT BEFORE ROUTER.GET('/:BLOGID) OTHERWISE ALL WILL BE CONSIDERED A PARAMETER
// TO GET ALL THE BLOGS = FOR ADMIN

router.get('/by-author/:authorId', asyncHandler(getAuthorsBlogs));

router.get(
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

router.get('/drafts', asyncHandler(authenticate), asyncHandler(getDrafts));
router.get('/:blogId', asyncHandler(getBlog));

// ALL THE SUBSEQUENT ROUTES WILL BE ONLY FOR AUTHENTICATED WRITERS
router.use(asyncHandler(authenticate), restrictTo('writer'));
router.post(
  '/upload-image',
  upload.single('contentImage'),
  asyncHandler(handleFirebaseUpload('contentImage')),
  asyncHandler(getImageUrl),
);
router.post('/create', asyncHandler(createDraft));
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

// getting the draft is needed in unpublished blogs and which are not completed
// saving is needed in the scenario where the edition is happening

router.patch(
  '/publish/:blogId',
  asyncHandler(checkBlogAuthor),
  upload.single('coverImage'),
  asyncHandler(handleFirebaseUpload('coverImage')),
  asyncHandler(publishBlog),
);

export default router;
