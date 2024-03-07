import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import commentRouter from './routes/comment.js';
import blogRouter from './routes/blog.js';
import errorHandler from './middleware/error.js';
/**All the things related to app are going to be here and
 * in the end app will be exported.
 * basically routers
 */

const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/comments', commentRouter);

// app.all('*', (req, res, next) => {
//   next(new Error(`Can't find ${req.originalUrl} on this server`));
// });

app.use(errorHandler);

export default app;
