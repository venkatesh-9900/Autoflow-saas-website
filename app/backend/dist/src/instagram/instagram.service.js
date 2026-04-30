"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let InstagramService = class InstagramService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async handleWebhook(payload) {
        console.log('Instagram Webhook received:', payload);
        return { status: 'success' };
    }
    async sendDirectMessage(recipientId, content, organizationId) {
        console.log(`Sending Instagram DM to ${recipientId}: ${content}`);
        return this.prisma.message.create({
            data: {
                channel: 'INSTAGRAM',
                to: recipientId,
                content,
                organizationId,
                status: 'SENT',
            },
        });
    }
    async createPost(organizationId, data) {
        if (!data.mediaAssetIds || data.mediaAssetIds.length === 0) {
            throw new common_1.BadRequestException('At least one media asset is required for a post');
        }
        const scheduledTime = data.scheduledFor
            ? new Date(data.scheduledFor)
            : null;
        const status = scheduledTime ? client_1.PostStatus.SCHEDULED : client_1.PostStatus.DRAFT;
        const post = await this.prisma.socialPost.create({
            data: {
                organizationId,
                integrationId: data.integrationId,
                caption: data.caption,
                scheduledFor: scheduledTime,
                status,
                platforms: data.platforms || ['INSTAGRAM'],
                mediaAssets: {
                    create: data.mediaAssetIds.map((mediaAssetId, index) => ({
                        mediaAssetId,
                        orderIndex: index,
                    })),
                },
            },
            include: { mediaAssets: { include: { mediaAsset: true } } },
        });
        return post;
    }
    async getPosts(organizationId) {
        return this.prisma.socialPost.findMany({
            where: { organizationId },
            include: { mediaAssets: { include: { mediaAsset: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async syncPostMetrics(postId) {
        const post = await this.prisma.socialPost.findUnique({
            where: { id: postId },
        });
        if (!post || post.status !== client_1.PostStatus.PUBLISHED || !post.externalPostId)
            return null;
        const mockMetrics = {
            likes: Math.floor(Math.random() * 1000),
            comments: Math.floor(Math.random() * 50),
            reach: Math.floor(Math.random() * 5000),
            saved: Math.floor(Math.random() * 20),
            lastSyncedAt: new Date().toISOString(),
        };
        return this.prisma.socialPost.update({
            where: { id: post.id },
            data: {
                metrics: mockMetrics,
            },
        });
    }
    async createBulkPosts(organizationId, data) {
        if (!data.posts || data.posts.length === 0) {
            throw new common_1.BadRequestException('No posts provided for bulk schedule.');
        }
        const createdPosts = [];
        const baseDate = new Date();
        for (let i = 0; i < data.posts.length; i++) {
            const postData = data.posts[i];
            if (!postData.mediaAssetIds || postData.mediaAssetIds.length === 0) {
                continue;
            }
            let scheduledTime = postData.scheduledFor
                ? new Date(postData.scheduledFor)
                : null;
            if (!scheduledTime) {
                scheduledTime = new Date(baseDate.getTime() + i * 24 * 60 * 60 * 1000);
            }
            const post = await this.prisma.socialPost.create({
                data: {
                    organizationId,
                    integrationId: data.integrationId,
                    caption: postData.caption,
                    scheduledFor: scheduledTime,
                    status: client_1.PostStatus.SCHEDULED,
                    platforms: postData.platforms || ['INSTAGRAM'],
                    mediaAssets: {
                        create: postData.mediaAssetIds.map((mediaAssetId, index) => ({
                            mediaAssetId,
                            orderIndex: index,
                        })),
                    },
                },
                include: { mediaAssets: { include: { mediaAsset: true } } },
            });
            createdPosts.push(post);
        }
        return { count: createdPosts.length, posts: createdPosts };
    }
};
exports.InstagramService = InstagramService;
exports.InstagramService = InstagramService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InstagramService);
//# sourceMappingURL=instagram.service.js.map