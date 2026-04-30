import { WorkerHost } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { MessageChannel } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
interface MessageJobData {
    messageId: string;
    organizationId: string;
    channel: MessageChannel;
    recipient: string;
    content: string;
    fallbackChannel?: MessageChannel;
}
export declare class MessageProcessor extends WorkerHost {
    private prisma;
    private failoverQueue;
    private readonly logger;
    constructor(prisma: PrismaService, failoverQueue: Queue);
    process(job: Job<MessageJobData, any, string>): Promise<any>;
}
export {};
