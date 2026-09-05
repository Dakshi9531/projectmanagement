import * as projectService from '../services/projectService.js';
import mongoose from 'mongoose';


// CREATE PROJECT
export async function createProject(req, res) {

    try {

        const project =
            await projectService.createProject(
                req.body,
                req.user.userId
            );

        res.status(201).json(project);

    } catch (err) {

        if (
            err.name === 'ValidationError' ||
            err.message.includes('does not exist')
        ) {
            return res.status(400).json({
                message: err.message
            });
        }

        res.status(500).json({
            message: 'Database error',
            error: err.message
        });
    }
}


// GET ALL PROJECTS
export async function getAllProjects(req, res) {

    try {

        const projects =
            await projectService.getAllProjects(
                req.query
            );

        res.json(projects);

    } catch (err) {

        res.status(500).json({
            message: 'Database error',
            error: err.message
        });
    }
}


// GET PROJECT BY ID
export async function getProjectById(req, res) {

    try {

        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: 'That is not a valid id'
            });
        }

        const project =
            await projectService.getProjectById(
                req.params.id
            );

        if (!project) {
            return res.status(404).json({
                message: 'Project not found'
            });
        }

        res.json(project);

    } catch (err) {

        res.status(500).json({
            message: 'Database error',
            error: err.message
        });
    }
}


// UPDATE PROJECT
export async function updateProject(req, res) {

    try {

        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: 'That is not a valid id'
            });
        }

        const project =
            await projectService.updateProject(
                req.params.id,
                req.body,
                req.user.userId
            );

        if (!project) {
            return res.status(404).json({
                message: 'Project not found'
            });
        }

        res.json(project);

    } catch (err) {

        if (
            err.name === 'ValidationError' ||
            err.message.includes('does not exist')
        ) {
            return res.status(400).json({
                message: err.message
            });
        }

        res.status(500).json({
            message: 'Database error',
            error: err.message
        });
    }
}


// DELETE PROJECT
export async function deleteProject(req, res) {

    try {

        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: 'That is not a valid id'
            });
        }

        const project =
            await projectService.deleteProject(
                req.params.id,
                req.user.userId
            );

        if (!project) {
            return res.status(404).json({
                message: 'Project not found'
            });
        }

        res.json({
            message: 'Project deleted',
            project: project
        });

    } catch (err) {

        res.status(500).json({
            message: 'Database error',
            error: err.message
        });
    }
}