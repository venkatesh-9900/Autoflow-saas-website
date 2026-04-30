import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MessageChannel } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
interface FailoverJobData {
    messageId: string;
    fallbackChannel: MessageChannel;
    recipient: string;
}
export declare class FailoverProcessor extends WorkerHost {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    process(job: Job<FailoverJobData, any, string>): Promise<any>;
}
export {};
