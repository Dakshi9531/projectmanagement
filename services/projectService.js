

import Project from '../models/projectModel.js';
import User from '../models/userModel.js';
import * as auditLogService from './auditLogService.js';


// CHECK WHETHER REFERENCED USERS EXIST
async function checkUsers(data) {

    const userFields = [
        'managerId',
        'ownerId',
        'createdBy',
        'updatedBy'
    ];

    for (const field of userFields) {

        if (data[field]) {

            const user = await User.findById(data[field]);

            if (!user) {
                throw new Error(`${field} user does not exist`);
            }
        }
    }
}


// CREATE PROJECT
export async function createProject(data, userId) {

    await checkUsers(data);

    const project = await Project.create({
        ...data,
        createdBy: userId,
        updatedBy: userId
    });

    // CREATE AUDIT LOG
    await auditLogService.createAuditLog({

        from: null,

        to: project.toObject(),

        createdBy: userId,

        updatedBy: userId,

        collection: 'Project',

        actionPerformed: 'CREATE'
    });

    return project;
}


// GET ALL PROJECTS
export async function getAllProjects() {

    return await Project.find()
        .populate('managerId', '-password')
        .populate('ownerId', '-password')
        .populate('createdBy', '-password')
        .populate('updatedBy', '-password');
}


// GET PROJECT BY ID
export async function getProjectById(id) {

    return await Project.findById(id)
        .populate('managerId', '-password')
        .populate('ownerId', '-password')
        .populate('createdBy', '-password')
        .populate('updatedBy', '-password');
}


// UPDATE PROJECT
export async function updateProject(id, data, userId) {

    await checkUsers(data);

    // Get old project before updating
    const oldProject = await Project.findById(id);

    if (!oldProject) {
        return null;
    }

    // Update project
    const updatedProject = await Project.findByIdAndUpdate(
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

    // CREATE AUDIT LOG
    await auditLogService.createAuditLog({

        from: oldProject.toObject(),

        to: updatedProject.toObject(),

        createdBy: updatedProject.createdBy,

        updatedBy: userId,

        collection: 'Project',

        actionPerformed: 'UPDATE'
    });

    return updatedProject;
}


// DELETE PROJECT
export async function deleteProject(id, userId) {

    // Get project before deleting
    const project = await Project.findById(id);

    if (!project) {
        return null;
    }

    // Delete project
    await Project.findByIdAndDelete(id);

    // CREATE AUDIT LOG
    await auditLogService.createAuditLog({

        from: project.toObject(),

        to: null,

        createdBy: project.createdBy,

        updatedBy: userId,

        collection: 'Project',

        actionPerformed: 'DELETE'
    });

    return project;
}