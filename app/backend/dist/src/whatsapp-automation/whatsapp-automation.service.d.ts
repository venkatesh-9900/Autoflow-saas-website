import { PrismaService } from '../prisma/prisma.service';
export declare class WhatsappAutomationService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    sendChatbotReply(organizationId: string, data: {
        recipientPhone: string;
        incomingMessage: string;
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
    bookAppointment(organizationId: string, data: {
        customerPhone: string;
        customerName: string;
        preferredDate: string;
        preferredTime: string;
        service: string;
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
    handleCustomerSupport(organizationId: string, data: {
        customerPhone: string;
        query: string;
        ticketId?: string;
    }): Promise<{
        ticketId: string;
        response: string;
        intent: string;
        escalated: boolean;
    }>;
    processSalesAssistant(organizationId: string, data: {
        customerPhone: string;
        message: string;
        context?: string;
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
    handleWebhook(payload: any): Promise<{
        status: string;
    }>;
    private detectIntent;
    private generateReply;
    private generateSupportResponse;
    private generateSalesResponse;
}
