import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
export interface PublishingJobData {
    postId: string;
    organizationId: string;
}
export declare class PublishingProcessor extends WorkerHost {
    private prisma;
    private notificationsService;
    private readonly logger;
    constructor(prisma: PrismaService, notificationsService: NotificationsService);
    process(job: Job<PublishingJobData>): Promise<void>;
}
