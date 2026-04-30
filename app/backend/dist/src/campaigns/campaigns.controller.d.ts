import { CampaignsService } from './campaigns.service';
import { MessageChannel } from '@prisma/client';
export declare class CampaignsController {
    private readonly campaignsService;
    constructor(campaignsService: CampaignsService);
    create(req: any, body: {
        name: string;
        type: MessageChannel;
        workflow?: any;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: string;
        type: import("@prisma/client").$Enums.MessageChannel;
        workflow: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    findAll(req: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: string;
        type: import("@prisma/client").$Enums.MessageChannel;
        workflow: import("@prisma/client/runtime/client").JsonValue | null;
    }[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: string;
        type: import("@prisma/client").$Enums.MessageChannel;
        workflow: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    update(req: any, id: string, body: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: string;
        type: import("@prisma/client").$Enums.MessageChannel;
        workflow: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: string;
        type: import("@prisma/client").$Enums.MessageChannel;
        workflow: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    trigger(req: any, id: string, body: {
        contactId: string;
    }): Promise<{
        status: string;
    }>;
}
