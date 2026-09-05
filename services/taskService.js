import Task from '../models/taskModel.js';
import Project from '../models/projectModel.js';
import User from '../models/userModel.js';

// ADD THIS
import * as auditLogService from './auditLogService.js';


// CREATE TASK
export async function createTask(data, userId) {

    const project = await Project.findById(data.projectId);

    if (!project) {
        throw new Error('Project does not exist');
    }

    const user = await User.findById(data.userId);

    if (!user) {
        throw new Error('User does not exist');
    }

    // CHANGE THIS
    /*const task = await Task.create({
        ...data,
        createdBy: userId,
        updatedBy: userId
    });*/
const task = await Task.create({
        ...data,
        createdBy: userId,
        updatedBy: userId
});

    // ADD AUDIT LOG HERE
    await auditLogService.createAuditLog({

        from: null,

        to: task.toObject(),

        createdBy: userId,

        updatedBy: userId,

        collection: 'Task',

        actionPerformed: 'CREATE'
    });

    return task;
}


// GET ALL TASKS
export async function getAllTasks() {

    return await Task.find()
        .populate('projectId')
        .populate('userId', '-password')
        .populate('createdBy', '-password')
        .populate('updatedBy', '-password');
}


// GET TASK BY ID
export async function getTaskById(id) {

    return await Task.findById(id)
        .populate('projectId')
        .populate('userId', '-password')
        .populate('createdBy', '-password')
        .populate('updatedBy', '-password');
}


// UPDATE TASK
export async function updateTask(id, data, userId) {

    if (data.projectId) {

        const project = await Project.findById(data.projectId);

        if (!project) {
            throw new Error('Project does not exist');
        }
    }


    if (data.userId) {

        const user = await User.findById(data.userId);

        if (!user) {
            throw new Error('User does not exist');
        }
    }


    // ADD THIS - get old task before updating
    const oldTask = await Task.findById(id);

    if (!oldTask) {
        return null;
    }


    // CHANGE THIS
    const updatedTask = await Task.findByIdAndUpdate(
        id,
        {
            ...data,
            updatedBy: userId
        },
        {
            new: true,
            runValidators: true
        }
    );


    // ADD AUDIT LOG HERE
    await auditLogService.createAuditLog({

        from: oldTask.toObject(),

        to: updatedTask.toObject(),

        createdBy: updatedTask.createdBy,

        updatedBy: userId,

        collection: 'Task',

        actionPerformed: 'UPDATE'
    });


    return updatedTask;
}


// DELETE TASK
export async function deleteTask(id, userId) {

    // ADD THIS - get task before deleting
    const task = await Task.findById(id);

    if (!task) {
        return null;
    }


    // DELETE TASK
    await Task.findByIdAndDelete(id);


    // ADD AUDIT LOG HERE
    await auditLogService.createAuditLog({

        from: task.toObject(),

        to: null,

        createdBy: task.createdBy,

        updatedBy: userId,

        collection: 'Task',

        actionPerformed: 'DELETE'
    });


    return task;
}