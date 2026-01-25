import express from 'express';
import { getTask, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { getAdmins, createAdmin, updateAdmin, deleteAdmin } from '../controllers/adminController.js';
import { getBoards, createBoard, updateBoard, deleteBoard } from '../controllers/boardController.js';

const router = express.Router();

router.get('/tasks', getTask);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

router.get('/admins', getAdmins);
router.post('/admins', createAdmin);
router.put('/admins/:id', updateAdmin);
router.delete('/admins/:id', deleteAdmin);

router.get('/boards', getBoards);
router.post('/boards', createBoard);
router.put('/boards/:id', updateBoard);
router.delete('/boards/:id', deleteBoard);

export default router;