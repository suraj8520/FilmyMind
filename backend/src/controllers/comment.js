import Blog from '../models/blog.js';
import Comment from '../models/comment.js';
import AppError from '../utils/appError.js';

const createComment = async (req, res, next) => {
  const { blogId } = req.params;
  const userId = req.user.id;
  const { parentId, text } = req.body;

  const blog = await Blog.findById(blogId);
  if (!blog)
    return next(new AppError("Invalid Blog you're comment on mate huh!", 400));

  blog.numberOfComments = blog.numberOfComments + 1;
  await blog.save();

  const newComment = await Comment.create({
    blog: blogId,
    user: userId,
    text,
    parentId,
  });

  res.status(201).json({
    status: 'success',
    data: {
      comment: newComment,
    },
  });
};

const editComment = async (req, res, next) => {
  const { blogId, commentId } = req.params;
  const { text } = req.body;
  const comment = await Comment.findById(commentId);
  if (!comment) return next(new AppError('Invalid commentId!', 400));

  if (String(comment.blog) !== String(blogId))
    return next(new AppError("the comments doesn't belong to the blog!", 400));

  comment.text = text;
  await comment.save();

  res.status(200).json({
    status: 'success',
    data: {
      comment,
    },
  });
};
const deleteComment = async (req, res, next) => {
  const { blogId, commentId } = req.params;
  const comment = await Comment.findByIdAndDelete({
    _id: commentId,
    blog: blogId,
  });

  if (!comment) return next(new AppError('Invalid Comment!', 400));

  res.status(200).json({
    status: 'success',
    data: {
      comment,
    },
  });
};
// Create two controllers
// 1 number of all the comments for admin
// IN blogs create a getStats function and get the statistics
const getCommentsCount = async (req, res) => {
  const comments = await Comment.find();
  res.status(200).json({
    status: 'success',
    data: {
      numberOfComments: comments.length,
    },
  });
};

export { createComment, editComment, deleteComment, getCommentsCount };
