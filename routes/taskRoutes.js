import express from 'express';

import {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} from '../controllers/taskController.js';

import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createTask);

router.get('/', authenticate, getAllTasks);

router.get('/:id', authenticate, getTaskById);

router.put('/:id', authenticate, updateTask);

router.delete('/:id', authenticate, deleteTask);

export default router;