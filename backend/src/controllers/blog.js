import Blog from '../models/blog.js';
import AppError from '../utils/appError.js';

const checkBlogAuthor = async (req, res, next) => {
  const { blogId } = req.params;
  const author = req.user.id;
  const blog = await Blog.findById(blogId);

  if (String(blog.author) !== String(author)) {
    return next(new AppError('No blog found with that id!', 404));
  }
  next();
};

const getBlog = async (req, res, next) => {
  const { blogId } = req.params;

  const blog = await Blog.findById(blogId);
  if (!blog.isPublished)
    return next(new AppError('No blog found with that id!', 404));

  res.status(200).json({
    status: 'success',
    data: {
      blog,
    },
  });
};

const createBlog = async (req, res) => {
  const { title, coverImage, content } = req.body;
  const author = req.user.id;

  const blog = await Blog.create({ title, coverImage, content, author });
  res.status(201).json({
    status: 'success',
    data: {
      blog,
    },
  });
};

const getDraft = async (req, res) => {
  const { blogId } = req.params;
  const blog = await Blog.findById(blogId);
  res.status(200).json({
    status: 'success',
    data: {
      blog,
    },
  });
};

// add stats as well.
const getMyBlogs = async (req, res) => {
  const author = req.user.id;

  const blogs = await Blog.find({ author });
  res.status(200).json({
    status: 'success',
    data: {
      blogs,
    },
  });
};

const publishBlog = async (req, res, next) => {
  const { blogId } = req.params;
  const { category, coverImage, title } = req.body;
  const blog = await Blog.findById(blogId);
  if (!blog) return next(new AppError('No blog found with the id', 400));

  blog.isPublished = true;
  blog.publishedAt = Date.now();
  blog.category = category;
  blog.title = title;
  blog.coverImage = coverImage;
  blog.save();

  res.status(200).json({
    status: 'success',
    data: {
      blog,
    },
  });
};

const editBlog = async (req, res, next) => {
  const { blogId } = req.params;
  const { title, coverImage, content } = req.body;

  const blog = await Blog.findById(blogId);
  if (!blog) return next(new AppError('No blog found with the id', 400));

  blog.title = title || blog.title;
  blog.coverImage = coverImage || blog.coverImage;
  blog.content = content || blog.content;
  await blog.save();

  res.status(200).json({
    status: 'success',
    data: {
      blog,
    },
  });
};

const saveDraft = async (req, res, next) => {
  const { blogId } = req.params;
  const { title, content } = req.body;

  const blog = await Blog.findById(blogId);
  if (!blog) return next(new AppError('No blog found with the id', 400));
  blog.title = title || blog.title;
  blog.content = content || blog.content;
  await blog.save();

  res.status(200).json({
    status: 'success',
    data: {
      blog,
    },
  });
};

const deleteBlog = async (req, res, next) => {
  const { blogId } = req.params;
  const blog = await Blog.findByIdAndDelete(blogId);
  if (!blog) return next(new AppError('No blog found with the id', 400));
  res.status(200).json({
    status: 'success',
    data: {
      blog,
    },
  });
};

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).json({
    status: 'success',
    data: {
      numberOfBlogs: blogs.length,
      blogs,
    },
  });
};

export {
  getBlog,
  getDraft,
  createBlog,
  saveDraft,
  editBlog,
  deleteBlog,
  checkBlogAuthor,
  getMyBlogs,
  publishBlog,
  getAllBlogs,
};

// change get unpublished blog to getdraft
// and create a route to save the draft
// handle checks
// You may need to add image upload while publishing
// You have to also handle the case of editing.
// 1. I need to create the method for uploading images and then adding urls in the content
