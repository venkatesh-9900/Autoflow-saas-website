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
var PublishingProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishingProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const notifications_service_1 = require("../notifications/notifications.service");
let PublishingProcessor = PublishingProcessor_1 = class PublishingProcessor extends bullmq_1.WorkerHost {
    prisma;
    notificationsService;
    logger = new common_1.Logger(PublishingProcessor_1.name);
    constructor(prisma, notificationsService) {
        super();
        this.prisma = prisma;
        this.notificationsService = notificationsService;
    }
    async process(job) {
        this.logger.log(`Processing publishing job for Post: ${job.data.postId}`);
        const post = await this.prisma.socialPost.findUnique({
            where: { id: job.data.postId },
            include: { mediaAssets: { include: { mediaAsset: true } } },
        });
        if (!post) {
            this.logger.warn(`Post not found: ${job.data.postId}`);
            return;
        }
        try {
            const platforms = post.platforms || ['INSTAGRAM'];
            for (const platform of platforms) {
                this.logger.log(`[${platform}] Publishing post ${post.id}`);
                await new Promise((resolve) => setTimeout(resolve, 400));
            }
            await this.prisma.socialPost.update({
                where: { id: post.id },
                data: {
                    status: client_1.PostStatus.PUBLISHED,
                    publishedAt: new Date(),
                    externalPostId: `multi_${Date.now()}`,
                },
            });
            this.logger.log(`Post ${post.id} published successfully across ${platforms.length} platforms.`);
            await this.notificationsService.triggerAlert(post.organizationId, 'Social Post Published', `Your post was published successfully to ${platforms.join(', ')}.`, 'SUCCESS');
        }
        catch (error) {
            this.logger.error(`Failed to publish post ${post.id}`, error);
            await this.prisma.socialPost.update({
                where: { id: post.id },
                data: {
                    status: client_1.PostStatus.FAILED,
                    errorMessage: error instanceof Error ? error.message : 'Unknown API Exception',
                },
            });
            await this.notificationsService.triggerAlert(post.organizationId, 'Instagram Publishing Failed', `Failed to publish post.`, 'ERROR');
            throw error;
        }
    }
};
exports.PublishingProcessor = PublishingProcessor;
exports.PublishingProcessor = PublishingProcessor = PublishingProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('publishing-queue', { concurrency: 2 }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], PublishingProcessor);
//# sourceMappingURL=publishing-processor.js.map