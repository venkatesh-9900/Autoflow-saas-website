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
var AccountAnalyticsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountAnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AccountAnalyticsService = AccountAnalyticsService_1 = class AccountAnalyticsService {
    prisma;
    logger = new common_1.Logger(AccountAnalyticsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAnalytics(organizationId, platform) {
        const where = { organizationId };
        if (platform)
            where.platform = platform;
        return this.prisma.accountAnalytics.findMany({
            where,
            orderBy: { snapshotDate: 'desc' },
            take: 30,
        });
    }
    async getLatestSnapshot(organizationId, platform) {
        return this.prisma.accountAnalytics.findFirst({
            where: { organizationId, platform },
            orderBy: { snapshotDate: 'desc' },
        });
    }
    async captureSnapshot(organizationId, platform) {
        this.logger.log(`Capturing analytics snapshot for ${platform}`);
        const metrics = this.generateMockMetrics(platform);
        return this.prisma.accountAnalytics.create({
            data: {
                organizationId,
                platform,
                ...metrics,
                snapshotDate: new Date(),
            },
        });
    }
    async getDashboardSummary(organizationId) {
        const platforms = [
            'INSTAGRAM', 'TWITTER', 'FACEBOOK', 'WHATSAPP', 'EMAIL', 'SMS',
        ];
        const summary = [];
        for (const platform of platforms) {
            const latest = await this.getLatestSnapshot(organizationId, platform);
            summary.push({
                platform,
                followersCount: latest?.followersCount || 0,
                engagementRate: latest?.engagementRate || 0,
                responseRate: latest?.responseRate || 0,
                postsCount: latest?.postsCount || 0,
            });
        }
        return summary;
    }
    generateMockMetrics(platform) {
        const base = {
            followersCount: Math.floor(Math.random() * 50000) + 1000,
            followingCount: Math.floor(Math.random() * 2000) + 100,
            postsCount: Math.floor(Math.random() * 500) + 50,
            engagementRate: parseFloat((Math.random() * 10 + 1).toFixed(2)),
            responseRate: parseFloat((Math.random() * 40 + 60).toFixed(2)),
            bestPostingTimes: ['09:00 AM', '12:30 PM', '6:00 PM', '8:00 PM'],
            hashtagStrategy: {
                top: ['#Automation', '#AI', '#Growth', '#Business', '#Tech'],
                trending: ['#2026Trends', '#AIRevolution'],
            },
            contentSuggestions: [
                'Post more carousel content for higher engagement',
                'Share behind-the-scenes stories',
                'Create short-form tutorial videos',
            ],
            metrics: { platform, generatedAt: new Date().toISOString() },
        };
        return base;
    }
};
exports.AccountAnalyticsService = AccountAnalyticsService;
exports.AccountAnalyticsService = AccountAnalyticsService = AccountAnalyticsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountAnalyticsService);
//# sourceMappingURL=account-analytics.service.js.map