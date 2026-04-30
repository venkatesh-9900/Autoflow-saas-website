import { AuditLogsService } from './audit-logs.service';
export declare class AuditLogsController {
    private readonly auditLogsService;
    constructor(auditLogsService: AuditLogsService);
    getLogs(req: any): Promise<{
        id: string;
        createdAt: Date;
        organizationId: string;
        userId: string | null;
        action: string;
        entityType: string;
        entityId: string | null;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
    }[]>;
}
