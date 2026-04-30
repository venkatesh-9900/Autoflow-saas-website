import { PrismaService } from '../prisma/prisma.service';
import { ServiceType } from '@prisma/client';
export declare class AccountAnalyticsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getAnalytics(organizationId: string, platform?: ServiceType): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        metrics: import("@prisma/client/runtime/client").JsonValue | null;
        platform: import("@prisma/client").$Enums.ServiceType;
        followersCount: number;
        followingCount: number;
        postsCount: number;
        engagementRate: number;
        responseRate: number;
        bestPostingTimes: import("@prisma/client/runtime/client").JsonValue | null;
        hashtagStrategy: import("@prisma/client/runtime/client").JsonValue | null;
        contentSuggestions: import("@prisma/client/runtime/client").JsonValue | null;
        snapshotDate: Date;
    }[]>;
    getLatestSnapshot(organizationId: string, platform: ServiceType): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        metrics: import("@prisma/client/runtime/client").JsonValue | null;
        platform: import("@prisma/client").$Enums.ServiceType;
        followersCount: number;
        followingCount: number;
        postsCount: number;
        engagementRate: number;
        responseRate: number;
        bestPostingTimes: import("@prisma/client/runtime/client").JsonValue | null;
        hashtagStrategy: import("@prisma/client/runtime/client").JsonValue | null;
        contentSuggestions: import("@prisma/client/runtime/client").JsonValue | null;
        snapshotDate: Date;
    } | null>;
    captureSnapshot(organizationId: string, platform: ServiceType): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        metrics: import("@prisma/client/runtime/client").JsonValue | null;
        platform: import("@prisma/client").$Enums.ServiceType;
        followersCount: number;
        followingCount: number;
        postsCount: number;
        engagementRate: number;
        responseRate: number;
        bestPostingTimes: import("@prisma/client/runtime/client").JsonValue | null;
        hashtagStrategy: import("@prisma/client/runtime/client").JsonValue | null;
        contentSuggestions: import("@prisma/client/runtime/client").JsonValue | null;
        snapshotDate: Date;
    }>;
    getDashboardSummary(organizationId: string): Promise<{
        platform: import("@prisma/client").$Enums.ServiceType;
        followersCount: number;
        engagementRate: number;
        responseRate: number;
        postsCount: number;
    }[]>;
    private generateMockMetrics;
}
