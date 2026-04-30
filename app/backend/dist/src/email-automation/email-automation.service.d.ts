import { PrismaService } from '../prisma/prisma.service';
export declare class EmailAutomationService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    sendAutoReply(organizationId: string, data: {
        recipientEmail: string;
        subject: string;
        incomingContent: string;
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
    scheduleCampaignEmail(organizationId: string, data: {
        subject: string;
        content: string;
        recipients: string[];
        scheduledFor: string;
        templateId?: string;
    }): Promise<{
        count: number;
        scheduledFor: string;
    }>;
    getEmailAnalytics(organizationId: string): Promise<{
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
    private detectIntent;
    private generateReply;
}
