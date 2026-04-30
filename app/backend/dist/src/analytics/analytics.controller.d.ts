import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getStats(req: any): Promise<{
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
