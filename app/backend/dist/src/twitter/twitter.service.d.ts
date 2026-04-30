import { PrismaService } from '../prisma/prisma.service';
export declare class TwitterService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    scheduleTweet(organizationId: string, data: {
        content: string;
        scheduledFor?: string;
        hashtags?: string[];
    }): Promise<{
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
    autoReplyToMention(organizationId: string, mentionData: {
        mentionId: string;
        authorHandle: string;
        content: string;
    }): Promise<{
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
    detectTrendingHashtags(organizationId: string): Promise<{
        trending: {
            hashtag: string;
            volume: number;
            trend: string;
        }[];
        analyzedAt: string;
    }>;
    getEngagementMetrics(organizationId: string): Promise<{
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
    private detectIntent;
    private generateReply;
}
