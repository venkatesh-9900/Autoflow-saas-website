import { PrismaService } from '../prisma/prisma.service';
export declare class AutomationTemplatesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(category?: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        tags: string[];
        description: string | null;
        workflow: import("@prisma/client/runtime/client").JsonValue;
        category: string;
        isSystem: boolean;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        tags: string[];
        description: string | null;
        workflow: import("@prisma/client/runtime/client").JsonValue;
        category: string;
        isSystem: boolean;
    }>;
    importTemplate(id: string, organizationId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: string;
        type: import("@prisma/client").$Enums.MessageChannel;
        workflow: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
}
