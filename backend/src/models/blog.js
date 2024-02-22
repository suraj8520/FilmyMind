import mongoose, { Schema } from 'mongoose';

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    maxLength: 150,
    minLength: 20,
  },
  numberOfComments: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  coverImage: {
    type: String,
    // handle default in frontend
    // default:
    //   'https://firebasestorage.googleapis.com/v0/b/filmymind-apersonalproject.appspot.com/o/placeholder%20img.webp?alt=media&token=e722ebc4-7d22-46ae-853d-11425c6c340c',
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: [true, 'Blog must belong to a author'],
  },
  category: {
    type: String,
    enum: { values: ['tv', 'movies'], message: '{VALUE} is not supported' },
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
  },
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
