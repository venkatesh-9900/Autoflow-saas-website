import { WorkerHost } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { MessagesService } from '../messages/messages.service';
import { InstagramService } from '../instagram/instagram.service';
export declare class AutomationProcessor extends WorkerHost {
    private prisma;
    private aiService;
    private messagesService;
    private instagramService;
    private campaignQueue;
    private publishingQueue;
    private readonly logger;
    constructor(prisma: PrismaService, aiService: AiService, messagesService: MessagesService, instagramService: InstagramService, campaignQueue: Queue, publishingQueue: Queue);
    process(job: Job<any, any, string>): Promise<any>;
}
