import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        trim: true
    },

    projectId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;