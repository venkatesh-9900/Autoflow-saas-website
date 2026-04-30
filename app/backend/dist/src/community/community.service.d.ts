import { PrismaService } from '../prisma/prisma.service';
export declare class CommunityService {
    private prisma;
    constructor(prisma: PrismaService);
    broadcast(organizationId: string, content: string, channel: 'WHATSAPP' | 'COMMUNITY'): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.MessageStatus;
        to: string;
        direction: import("@prisma/client").$Enums.MessageDirection;
        channel: import("@prisma/client").$Enums.MessageChannel;
        content: string;
        sid: string | null;
        threadId: string | null;
        assigneeId: string | null;
        internalNote: string | null;
    }>;
    generateJoinLink(organizationId: string, groupId: string): Promise<{
        joinLink: string;
    }>;
}
