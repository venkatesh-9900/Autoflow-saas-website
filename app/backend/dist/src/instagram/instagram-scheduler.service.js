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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var InstagramSchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramSchedulerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const client_1 = require("@prisma/client");
let InstagramSchedulerService = InstagramSchedulerService_1 = class InstagramSchedulerService {
    prisma;
    publishingQueue;
    logger = new common_1.Logger(InstagramSchedulerService_1.name);
    constructor(prisma, publishingQueue) {
        this.prisma = prisma;
        this.publishingQueue = publishingQueue;
    }
    async handleScheduledPosts() {
        this.logger.debug('Running scheduled posts check for Instagram...');
        const now = new Date();
        const postsToPublish = await this.prisma.socialPost.findMany({
            where: {
                status: client_1.PostStatus.SCHEDULED,
                scheduledFor: {
                    lte: now,
                },
            },
        });
        if (postsToPublish.length > 0) {
            this.logger.log(`Found ${postsToPublish.length} scheduled posts to publish.`);
            for (const post of postsToPublish) {
                await this.publishingQueue.add('publish-instagram-post', {
                    postId: post.id,
                    organizationId: post.organizationId,
                });
                await this.prisma.socialPost.update({
                    where: { id: post.id },
                    data: { status: client_1.PostStatus.PUBLISHED },
                });
            }
        }
    }
};
exports.InstagramSchedulerService = InstagramSchedulerService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InstagramSchedulerService.prototype, "handleScheduledPosts", null);
exports.InstagramSchedulerService = InstagramSchedulerService = InstagramSchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, bullmq_1.InjectQueue)('publishing-queue')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        bullmq_2.Queue])
], InstagramSchedulerService);
//# sourceMappingURL=instagram-scheduler.service.js.map