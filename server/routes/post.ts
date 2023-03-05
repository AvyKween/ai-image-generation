import { Router } from 'express';
import { getPosts } from '../controllers/posts';
import { v2 as cloudinary } from 'cloudinary';

const router = Router();

router.get('/', getPosts);

export default router;