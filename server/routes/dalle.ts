import { Router } from 'express';
import { postDalleImage } from '../controllers/dalle';

const router = Router();

router.post('/', postDalleImage);

export default router;