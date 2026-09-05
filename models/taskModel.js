import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({

    taskName: {
        type: String,
        required: true,
        trim: true
    },

    taskId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },

    userId: {
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

const Task = mongoose.model('Task', taskSchema);

export default Task;