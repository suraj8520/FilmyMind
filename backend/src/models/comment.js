import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  comment: {
    type: String,
    required: [true, "Comment can't be empty"],
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: [true, 'Comment belongs to a user'],
  },
  blog: {
    type: Schema.ObjectId,
    ref: 'Blog',
    required: [true, 'Where are you writing the comment if not on blog'],
  },
  replies: [
    {
      type: Schema.ObjectId,
      ref: 'Comment',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Comment = model('Comment', commentSchema);
export default Comment;
