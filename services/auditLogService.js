import AuditLog from '../models/auditLogModel.js';

export async function createAuditLog(data) {

    return await AuditLog.create(data);
}