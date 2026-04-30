import { PrismaService } from '../prisma/prisma.service';
import { Queue } from 'bullmq';
export declare class InstagramSchedulerService {
    private prisma;
    private publishingQueue;
    private readonly logger;
    constructor(prisma: PrismaService, publishingQueue: Queue);
    handleScheduledPosts(): Promise<void>;
}
