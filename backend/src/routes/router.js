import express from 'express';
import { getTask, createTask, putHandler, deleteHandler } from '../controllers/controller.js';
const router = express.Router();

router.get('/', getTask);
router.post('/', createTask);
router.put('/', putHandler);
router.delete('/', deleteHandler);

export default router;