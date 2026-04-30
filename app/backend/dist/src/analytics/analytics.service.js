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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AnalyticsService = class AnalyticsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStats(organizationId) {
        const [messages, campaigns, contacts, socialPosts] = await Promise.all([
            this.prisma.message.groupBy({
                by: ['status'],
                where: { organizationId },
                _count: true,
            }),
            this.prisma.campaign.count({
                where: { organizationId },
            }),
            this.prisma.contact.count({
                where: { organizationId },
            }),
            this.prisma.socialPost.groupBy({
                by: ['status'],
                where: { organizationId },
                _count: true,
            }),
        ]);
        const messageStats = messages.reduce((acc, curr) => {
            acc[curr.status] = curr._count;
            return acc;
        }, {});
        const postStats = socialPosts.reduce((acc, curr) => {
            acc[curr.status] = curr._count;
            return acc;
        }, {});
        return {
            totalMessages: Object.values(messageStats).reduce((a, b) => a + b, 0),
            deliveredMessages: messageStats['DELIVERED'] || 0,
            failedMessages: messageStats['FAILED'] || 0,
            activeCampaigns: campaigns,
            totalContacts: contacts,
            socialPosts: {
                total: Object.values(postStats).reduce((a, b) => a + b, 0),
                published: postStats['PUBLISHED'] || 0,
                scheduled: postStats['SCHEDULED'] || 0,
                failed: postStats['FAILED'] || 0,
                draft: postStats['DRAFT'] || 0,
            },
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map