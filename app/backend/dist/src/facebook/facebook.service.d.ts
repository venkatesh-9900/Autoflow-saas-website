import { PrismaService } from '../prisma/prisma.service';
export declare class FacebookService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    createPost(organizationId: string, data: {
        content: string;
        mediaUrl?: string;
        scheduledFor?: string;
    }): Promise<{
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
    moderateComment(organizationId: string, commentData: {
        commentId: string;
        postId: string;
        content: string;
        authorName: string;
    }): Promise<{
        commentId: string;
        sentiment: string;
        action: string;
        autoReply: string | null;
    }>;
    sendMessengerReply(organizationId: string, data: {
        recipientId: string;
        content: string;
    }): Promise<{
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
    generateLeadWorkflow(organizationId: string): Promise<{
        workflow: {
            trigger: string;
            steps: {
                id: number;
                action: string;
                description: string;
            }[];
        };
    }>;
    getPageInsights(organizationId: string): Promise<{
        pageViews: number;
        pageLikes: number;
        postReach: number;
        postEngagement: number;
        messengerConversations: number;
        responseRate: number;
        avgResponseTime: string;
        period: string;
    }>;
    handleWebhook(payload: any): Promise<{
        status: string;
    }>;
    private analyzeSentiment;
}
