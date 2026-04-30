import { InstagramService } from './instagram.service';
export declare class InstagramController {
    private readonly instagramService;
    constructor(instagramService: InstagramService);
    handleWebhook(payload: any): Promise<{
        status: string;
    }>;
    sendDM(req: any, body: {
        recipientId: string;
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
    createPost(req: any, body: any): Promise<{
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
    createBulkPosts(req: any, body: any): Promise<{
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
    getPosts(req: any): Promise<({
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
    syncMetrics(id: string): Promise<{
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
}
