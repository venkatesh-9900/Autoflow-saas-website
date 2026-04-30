import { PrismaService } from '../prisma/prisma.service';
import { MessageChannel } from '@prisma/client';
import { Queue } from 'bullmq';
export declare class CampaignsService {
    private prisma;
    private campaignQueue;
    constructor(prisma: PrismaService, campaignQueue: Queue);
    trigger(id: string, organizationId: string, contactId: string): Promise<{
        status: string;
    }>;
    create(organizationId: string, data: {
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
    findAll(organizationId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: string;
        type: import("@prisma/client").$Enums.MessageChannel;
        workflow: import("@prisma/client/runtime/client").JsonValue | null;
    }[]>;
    findOne(id: string, organizationId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: string;
        type: import("@prisma/client").$Enums.MessageChannel;
        workflow: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    update(id: string, organizationId: string, data: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: string;
        type: import("@prisma/client").$Enums.MessageChannel;
        workflow: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    remove(id: string, organizationId: string): Promise<{
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
