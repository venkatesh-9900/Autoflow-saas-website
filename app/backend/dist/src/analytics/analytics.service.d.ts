import { PrismaService } from '../prisma/prisma.service';
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    getStats(organizationId: string): Promise<{
        totalMessages: number;
        deliveredMessages: number;
        failedMessages: number;
        activeCampaigns: number;
        totalContacts: number;
        socialPosts: {
            total: number;
            published: number;
            scheduled: number;
            failed: number;
            draft: number;
        };
    }>;
}
