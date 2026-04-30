import { AutomationTemplatesService } from './automation-templates.service';
export declare class AutomationTemplatesController {
    private readonly templatesService;
    constructor(templatesService: AutomationTemplatesService);
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
    importTemplate(id: string, req: any): Promise<{
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
