import Blog from '../models/blog.js';
import AppError from '../utils/appError.js';

const checkBlogAuthor = async (req, res, next) => {
  const { blogId } = req.params;
  const author = req.user.id;
  const blog = await Blog.findById(blogId);
  if (String(blog.author.id) !== String(author)) {
    return next(new AppError('No blog found with that id!', 404));
  }
  next();
};

const getImageUrl = async (req, res) => {
  const { contentImage: imgUrl } = req.body;
  res.status(200).json({
    status: 'success',
    data: {
      imgUrl,
    },
  });
};

const getBlog = async (req, res, next) => {
  const { blogId } = req.params;
  const blog = await Blog.findById(blogId);
  if (!blog.isPublished)
    return next(new AppError('No blog found with that id!', 404));

  blog.views += 1;
  await blog.save();

  res.status(200).json({
    status: 'success',
    data: {
      blog,
    },
  });
};

const createDraft = async (req, res) => {
  const { title, coverImage: image, description, content } = req.body;
  const author = req.user.id;
  const coverImage = image || '';
  const blog = await Blog.create({
    title,
    coverImage,
    description,
    content,
    author,
    updatedAt: new Date(),
  });
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
  const { category, coverImage, title, description } = req.body;
  const blog = await Blog.findById(blogId);
  if (!blog) return next(new AppError('No blog found with the id', 400));

  blog.isPublished = true;
  blog.publishedAt = Date.now();
  blog.category = category;
  blog.description = description;
  blog.title = title;
  blog.coverImage = coverImage;
  await blog.save();

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
  const { title, content, description } = req.body;
  const blog = await Blog.findById(blogId);
  if (!blog) return next(new AppError('No blog found with the id', 400));
  blog.title = title;
  blog.content = content;
  blog.description = description;
  blog.updatedAt = new Date();
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

const getDrafts = async (req, res) => {
  const authorId = req.user.id;
  const blogs = await Blog.find({
    author: authorId,
    isPublished: false,
  }).select('title description updatedAt createdAt');
  res.status(200).json({
    status: 'success',
    data: {
      blogs,
    },
  });
};

const getAuthorsBlogs = async (req, res) => {
  const { authorId } = req.params;
  const blogs = await Blog.find({ author: authorId, isPublished: true });
  res.status(200).json({
    status: 'success',
    data: {
      blogs,
    },
  });
};

const getAllBlogs = async (req, res) => {
  let options = { isPublished: true };
  if (req.query && req.query.search) {
    const searchRegex = new RegExp(req.query.search, 'i'); // i for case insensitive
    options = { ...options, title: { $regex: searchRegex } };
  }

  const blogs = await Blog.find(options).select(
    'coverImage title description author publishedAt',
  );
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
  createDraft,
  saveDraft,
  editBlog,
  deleteBlog,
  checkBlogAuthor,
  getMyBlogs,
  publishBlog,
  getAllBlogs,
  getAuthorsBlogs,
  getDrafts,
  getImageUrl,
};

// change get unpublished blog to getdraft
// and create a route to save the draft
// handle checks
// You may need to add image upload while publishing
// You have to also handle the case of editing.
// 1. I need to create the method for uploading images and then adding urls in the content
