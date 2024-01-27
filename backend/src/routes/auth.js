import express from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import { signup } from '../controllers/Auth.js';
const router = express.Router();

router.post('/signup', asyncHandler(signup));

export default router;
