import express from 'express';
import { getTask, createTask, updateTask, deleteTask, getTaskById, assignUserToTask, removeUserFromTask } from '../controllers/taskController.js';
import { getAdmins, createAdmin, updateAdmin, deleteAdmin } from '../controllers/adminController.js';
import { getBoards, createBoard, updateBoard, deleteBoard } from '../controllers/boardController.js';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/tasks', getTask);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
router.get('/tasks/:id', getTaskById);
router.patch('/tasks/:id/assignUser', assignUserToTask);
router.patch('/tasks/:id/removeUser', removeUserFromTask);


router.get('/admins', getAdmins);
router.post('/admins', createAdmin);
router.put('/admins/:id', updateAdmin);
router.delete('/admins/:id', deleteAdmin);

router.get('/boards', getBoards);
router.post('/boards', createBoard);
router.put('/boards/:id', updateBoard);
router.delete('/boards/:id', deleteBoard);

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;