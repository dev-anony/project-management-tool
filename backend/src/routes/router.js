import express from 'express';
import { getTask, createTask, updateTask, deleteTask, getTaskById, getTasksByBoardId, assignUserToTask, removeUserFromTask } from '../controllers/task.js';
import { getAdmins, createAdmin, updateAdmin, deleteAdmin } from '../controllers/admin.js';
import { getBoards, createBoard, updateBoard, deleteBoard } from '../controllers/board.js';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/user.js';

const router = express.Router();

router.get('/tasks', getTask);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
router.get('/tasks/:boardId/taskByBoard', getTasksByBoardId);
router.patch('/tasks/assignUser/:id/:devId', assignUserToTask);
router.patch('/tasks/removeUser/:id/:devId', removeUserFromTask);


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