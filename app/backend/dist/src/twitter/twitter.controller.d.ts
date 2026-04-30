import { TwitterService } from './twitter.service';
export declare class TwitterController {
    private readonly twitterService;
    constructor(twitterService: TwitterService);
    scheduleTweet(req: any, body: any): Promise<{
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
    replyToMention(req: any, body: any): Promise<{
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
    getTrending(req: any): Promise<{
        trending: {
            hashtag: string;
            volume: number;
            trend: string;
        }[];
        analyzedAt: string;
    }>;
    getEngagement(req: any): Promise<{
        impressions: number;
        engagements: number;
        engagementRate: number;
        retweets: number;
        likes: number;
        replies: number;
        profileVisits: number;
        followerGrowth: number;
        topTweet: {
            content: string;
            impressions: number;
            engagements: number;
        };
        period: string;
    }>;
    handleWebhook(payload: any): Promise<{
        status: string;
    }>;
}
