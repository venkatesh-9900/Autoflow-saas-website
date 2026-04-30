import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
export declare class ChatbotService {
    private prisma;
    private ai;
    constructor(prisma: PrismaService, ai: AiService);
    handleMessage(organizationId: string, channel: any, senderId: string, text: string): Promise<{
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
    getChatbotSettings(organizationId: string): Promise<{
        welcomeMessage: string;
        enabled: boolean;
    }>;
}
