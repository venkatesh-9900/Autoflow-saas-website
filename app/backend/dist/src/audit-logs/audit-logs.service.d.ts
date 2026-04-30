import { PrismaService } from '../prisma/prisma.service';
export declare class AuditLogsService {
    private prisma;
    constructor(prisma: PrismaService);
    log(data: {
        organizationId: string;
        userId?: string;
        action: string;
        entityType: string;
        entityId?: string;
        metadata?: any;
    }): Promise<{
        id: string;
        createdAt: Date;
        organizationId: string;
        userId: string | null;
        action: string;
        entityType: string;
        entityId: string | null;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    getLogs(organizationId: string): Promise<{
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
