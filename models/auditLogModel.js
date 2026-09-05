import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
    {
        from: {
            type: mongoose.Schema.Types.Mixed
        },

        to: {
            type: mongoose.Schema.Types.Mixed
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        collection: {
            type: String,
            required: true
        },

        actionPerformed: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;