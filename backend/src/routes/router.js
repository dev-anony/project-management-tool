import express from 'express';
import { getHandler, postHandler, putHandler, deleteHandler } from '../controllers/controller.js';
const router = express.Router();

router.get('/', getHandler);
router.post('/', postHandler);
router.put('/', putHandler);
router.delete('/', deleteHandler);

export default router;