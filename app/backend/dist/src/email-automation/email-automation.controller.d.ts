import { EmailAutomationService } from './email-automation.service';
export declare class EmailAutomationController {
    private readonly emailService;
    constructor(emailService: EmailAutomationService);
    autoReply(req: any, body: any): Promise<{
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
    scheduleCampaign(req: any, body: any): Promise<{
        count: number;
        scheduledFor: string;
    }>;
    getAnalytics(req: any): Promise<{
        totalSent: number;
        delivered: number;
        opened: number;
        clicked: number;
        bounced: number;
        unsubscribed: number;
        openRate: number;
        clickRate: number;
        bounceRate: number;
        period: string;
    }>;
    handleWebhook(payload: any): Promise<{
        status: string;
    }>;
}
