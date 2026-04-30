import { PrismaService } from '../prisma/prisma.service';
export declare class InstagramService {
    private prisma;
    constructor(prisma: PrismaService);
    handleWebhook(payload: any): Promise<{
        status: string;
    }>;
    sendDirectMessage(recipientId: string, content: string, organizationId: string): Promise<{
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
    createPost(organizationId: string, data: {
        integrationId: string;
        caption?: string;
        mediaAssetIds: string[];
        scheduledFor?: string;
        platforms?: any[];
    }): Promise<{
        mediaAssets: ({
            mediaAsset: {
                url: string;
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                organizationId: string;
                type: import("@prisma/client").$Enums.MediaType;
                size: number;
                folder: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            orderIndex: number;
            mediaAssetId: string;
            socialPostId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.PostStatus;
        caption: string | null;
        platforms: import("@prisma/client").$Enums.SocialPlatform[];
        scheduledFor: Date | null;
        publishedAt: Date | null;
        externalPostId: string | null;
        metrics: import("@prisma/client/runtime/client").JsonValue | null;
        errorMessage: string | null;
        integrationId: string;
    }>;
    getPosts(organizationId: string): Promise<({
        mediaAssets: ({
            mediaAsset: {
                url: string;
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                organizationId: string;
                type: import("@prisma/client").$Enums.MediaType;
                size: number;
                folder: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            orderIndex: number;
            mediaAssetId: string;
            socialPostId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.PostStatus;
        caption: string | null;
        platforms: import("@prisma/client").$Enums.SocialPlatform[];
        scheduledFor: Date | null;
        publishedAt: Date | null;
        externalPostId: string | null;
        metrics: import("@prisma/client/runtime/client").JsonValue | null;
        errorMessage: string | null;
        integrationId: string;
    })[]>;
    syncPostMetrics(postId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.PostStatus;
        caption: string | null;
        platforms: import("@prisma/client").$Enums.SocialPlatform[];
        scheduledFor: Date | null;
        publishedAt: Date | null;
        externalPostId: string | null;
        metrics: import("@prisma/client/runtime/client").JsonValue | null;
        errorMessage: string | null;
        integrationId: string;
    } | null>;
    createBulkPosts(organizationId: string, data: {
        integrationId: string;
        posts: {
            caption?: string;
            mediaAssetIds: string[];
            scheduledFor?: string;
            platforms?: any[];
        }[];
    }): Promise<{
        count: number;
        posts: ({
            mediaAssets: ({
                mediaAsset: {
                    url: string;
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    organizationId: string;
                    type: import("@prisma/client").$Enums.MediaType;
                    size: number;
                    folder: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                orderIndex: number;
                mediaAssetId: string;
                socialPostId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            status: import("@prisma/client").$Enums.PostStatus;
            caption: string | null;
            platforms: import("@prisma/client").$Enums.SocialPlatform[];
            scheduledFor: Date | null;
            publishedAt: Date | null;
            externalPostId: string | null;
            metrics: import("@prisma/client/runtime/client").JsonValue | null;
            errorMessage: string | null;
            integrationId: string;
        })[];
    }>;
}
