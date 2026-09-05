import express from 'express';

import {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
} from '../controllers/projectController.js';

import { authenticate } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/', authenticate, createProject);

router.get('/', authenticate, getAllProjects);

router.get('/:id', authenticate, getProjectById);

router.put('/:id', authenticate, updateProject);

router.delete('/:id', authenticate, deleteProject);



export default router;