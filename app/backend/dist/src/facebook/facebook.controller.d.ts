import { FacebookService } from './facebook.service';
export declare class FacebookController {
    private readonly facebookService;
    constructor(facebookService: FacebookService);
    createPost(req: any, body: any): Promise<{
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
    moderateComment(req: any, body: any): Promise<{
        commentId: string;
        sentiment: string;
        action: string;
        autoReply: string | null;
    }>;
    messengerReply(req: any, body: any): Promise<{
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
    getLeadWorkflow(req: any): Promise<{
        workflow: {
            trigger: string;
            steps: {
                id: number;
                action: string;
                description: string;
            }[];
        };
    }>;
    getInsights(req: any): Promise<{
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
}
