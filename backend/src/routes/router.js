import express from 'express';
import { 
    getTask, 
    createTask, 
    updateTask, 
    deleteTask, 
    patchTask,
    getTaskById, 
    getTasksByBoardId, 
    assignUserToTask, 
    removeUserFromTask 
} from '../controllers/task.js';

import { getAdmins, createAdmin, updateAdmin, deleteAdmin } from '../controllers/admin.js';
import { getBoards, createBoard, updateBoard, deleteBoard } from '../controllers/board.js';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/user.js';


const router = express.Router();

router.get('/tasks', getTask);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.patch ('/tasks/:id',patchTask);        
// partial update (labels / cover / dueDate / members / checklist / description / content)
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

const teamController = await import('../controllers/team.js');

router.get('/teams', teamController.getTeams);
router.post('/teams', teamController.createTeam);
router.put('/teams/:id', teamController.updateTeam);
router.delete('/teams/:id', teamController.deleteTeam);
router.get('/teams/:id', teamController.getTeamById);
router.get('/teams/col/:col', teamController.getTeamsByCol);
router.get('/teams/dev/:devId', teamController.getTeamByDevId);
router.patch('/teams/assignDev/:id/:devId', teamController.assignDevToTeam);
router.patch('/teams/removeDev/:id/:devId', teamController.removeDevFromTeam);

const colController = await import('../controllers/column.js');

router.get('/columns', colController.getColumns);
router.post('/columns', colController.createColumn);
router.put('/columns/:id', colController.updateColumn);
router.delete('/columns/:id', colController.deleteColumn);
router.get('/columns/:id', colController.getColumnById);

export default router;

//might create an issue while updating things.
// requires to $addtoset or $pull

/*
  patchTask controller (implement in controllers/task.js):
  ─────────────────────────────────────────────────────────
  export const patchTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },   // only updates fields that are sent
        { new: true }
      );
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.json(task);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
*/