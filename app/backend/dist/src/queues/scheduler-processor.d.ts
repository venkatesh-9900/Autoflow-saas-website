import { WorkerHost } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';
interface SchedulerJobData {
    campaignId: string;
}
export declare class SchedulerProcessor extends WorkerHost {
    private prisma;
    private messageQueue;
    private readonly logger;
    constructor(prisma: PrismaService, messageQueue: Queue);
    process(job: Job<SchedulerJobData, any, string>): Promise<any>;
}
export {};
