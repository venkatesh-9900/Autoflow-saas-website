import { TemplatesService } from './templates.service';
import { MessageChannel } from '@prisma/client';
export declare class TemplatesController {
    private readonly templatesService;
    constructor(templatesService: TemplatesService);
    create(req: any, body: {
        name: string;
        content: string;
        channel: MessageChannel;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        channel: import("@prisma/client").$Enums.MessageChannel;
        content: string;
    }>;
    getMarketplace(): {
        id: string;
        name: string;
        desc: string;
        category: string;
        price: string;
        channel: string;
        color: string;
        icon: string;
        stats: string;
    }[];
    cloneFromMarketplace(req: any, id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        channel: import("@prisma/client").$Enums.MessageChannel;
        content: string;
    }>;
    findAll(req: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        channel: import("@prisma/client").$Enums.MessageChannel;
        content: string;
    }[]>;
    findOne(req: any, id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        channel: import("@prisma/client").$Enums.MessageChannel;
        content: string;
    }>;
    update(req: any, id: string, body: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        channel: import("@prisma/client").$Enums.MessageChannel;
        content: string;
    }>;
    remove(req: any, id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        channel: import("@prisma/client").$Enums.MessageChannel;
        content: string;
    }>;
}
