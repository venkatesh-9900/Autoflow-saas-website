import { MessagesService } from './messages.service';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    findAll(req: any): Promise<{
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
    }[]>;
    findOne(req: any, id: string): Promise<{
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
}
