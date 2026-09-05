import * as taskService from '../services/taskService.js';
import mongoose from 'mongoose';


// CREATE TASK
export async function createTask(req, res) {

    try {

        const task =
            await taskService.createTask(
                req.body,
                req.user.userId
            );

        res.status(201).json(task);

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


// GET ALL TASKS
export async function getAllTasks(req, res) {

    try {

        const tasks =
            await taskService.getAllTasks();

        res.json(tasks);

    } catch (err) {

        res.status(500).json({
            message: 'Database error',
            error: err.message
        });
    }
}


// GET TASK BY ID
export async function getTaskById(req, res) {

    try {

        if (!mongoose.isValidObjectId(req.params.id)) {

            return res.status(400).json({
                message: 'That is not a valid id'
            });
        }

        const task =
            await taskService.getTaskById(
                req.params.id
            );

        if (!task) {

            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.json(task);

    } catch (err) {

        res.status(500).json({
            message: 'Database error',
            error: err.message
        });
    }
}


// UPDATE TASK
export async function updateTask(req, res) {

    try {

        if (!mongoose.isValidObjectId(req.params.id)) {

            return res.status(400).json({
                message: 'That is not a valid id'
            });
        }

        const task =
            await taskService.updateTask(
                req.params.id,
                req.body,
                req.user.userId
            );

        if (!task) {

            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.json(task);

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


// DELETE TASK
export async function deleteTask(req, res) {

    try {

        if (!mongoose.isValidObjectId(req.params.id)) {

            return res.status(400).json({
                message: 'That is not a valid id'
            });
        }

        const task =
            await taskService.deleteTask(
                req.params.id,
                //req.user._id
                req.user._id
            );

        if (!task) {

            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.json({
            message: 'Task deleted',
            task: task
        });

    } catch (err) {

        res.status(500).json({
            message: 'Database error',
            error: err.message
        });
    }
}