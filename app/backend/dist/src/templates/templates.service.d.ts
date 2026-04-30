import { PrismaService } from '../prisma/prisma.service';
import { MessageChannel } from '@prisma/client';
export declare class TemplatesService {
    private prisma;
    constructor(prisma: PrismaService);
    getMarketplaceTemplates(): {
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
    cloneTemplate(id: string, organizationId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        channel: import("@prisma/client").$Enums.MessageChannel;
        content: string;
    }>;
    create(organizationId: string, data: {
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
    findAll(organizationId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        channel: import("@prisma/client").$Enums.MessageChannel;
        content: string;
    }[]>;
    findOne(id: string, organizationId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        channel: import("@prisma/client").$Enums.MessageChannel;
        content: string;
    }>;
    update(id: string, organizationId: string, data: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        channel: import("@prisma/client").$Enums.MessageChannel;
        content: string;
    }>;
    remove(id: string, organizationId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        channel: import("@prisma/client").$Enums.MessageChannel;
        content: string;
    }>;
}
