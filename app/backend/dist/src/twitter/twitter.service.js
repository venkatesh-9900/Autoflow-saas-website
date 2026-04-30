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
var TwitterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitterService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TwitterService = TwitterService_1 = class TwitterService {
    prisma;
    logger = new common_1.Logger(TwitterService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async scheduleTweet(organizationId, data) {
        this.logger.log(`Scheduling tweet for org ${organizationId}`);
        const hashtags = data.hashtags?.map((h) => `#${h}`).join(' ') || '';
        const fullContent = `${data.content} ${hashtags}`.trim();
        return this.prisma.message.create({
            data: {
                organizationId,
                channel: 'TWITTER',
                to: 'twitter_timeline',
                content: fullContent,
                status: data.scheduledFor ? 'PENDING' : 'SENT',
            },
        });
    }
    async autoReplyToMention(organizationId, mentionData) {
        this.logger.log(`Processing mention from @${mentionData.authorHandle}: ${mentionData.content}`);
        const intent = this.detectIntent(mentionData.content);
        const reply = this.generateReply(intent, mentionData.authorHandle);
        return this.prisma.message.create({
            data: {
                organizationId,
                channel: 'TWITTER',
                direction: 'OUTBOUND',
                to: mentionData.authorHandle,
                content: reply,
                status: 'SENT',
                sid: mentionData.mentionId,
            },
        });
    }
    async detectTrendingHashtags(organizationId) {
        this.logger.log(`Detecting trending hashtags for org ${organizationId}`);
        return {
            trending: [
                { hashtag: '#AI', volume: 125000, trend: 'rising' },
                { hashtag: '#Automation', volume: 89000, trend: 'stable' },
                { hashtag: '#SaaS', volume: 67000, trend: 'rising' },
                { hashtag: '#Growth', volume: 54000, trend: 'declining' },
                { hashtag: '#TechStartup', volume: 42000, trend: 'rising' },
                { hashtag: '#ContentCreator', volume: 38000, trend: 'rising' },
            ],
            analyzedAt: new Date().toISOString(),
        };
    }
    async getEngagementMetrics(organizationId) {
        this.logger.log(`Fetching engagement metrics for org ${organizationId}`);
        return {
            impressions: 45200,
            engagements: 3150,
            engagementRate: 6.97,
            retweets: 420,
            likes: 1890,
            replies: 340,
            profileVisits: 1250,
            followerGrowth: 85,
            topTweet: {
                content: 'Exciting update coming soon! 🚀',
                impressions: 12500,
                engagements: 890,
            },
            period: 'last_7_days',
        };
    }
    async handleWebhook(payload) {
        this.logger.log('Twitter webhook received');
        return { status: 'success' };
    }
    detectIntent(content) {
        const lower = content.toLowerCase();
        if (lower.includes('help') || lower.includes('support'))
            return 'support';
        if (lower.includes('price') || lower.includes('cost'))
            return 'pricing';
        if (lower.includes('bug') || lower.includes('issue'))
            return 'bug_report';
        if (lower.includes('thanks') || lower.includes('love'))
            return 'positive';
        return 'general';
    }
    generateReply(intent, handle) {
        const replies = {
            support: `Hey @${handle}! We're here to help. DM us and we'll get you sorted right away! 💪`,
            pricing: `Hi @${handle}! Check out our pricing page for the latest plans. DM us for custom enterprise quotes! 📊`,
            bug_report: `Thanks for flagging this @${handle}! Our team is looking into it. We'll keep you updated. 🔧`,
            positive: `Thank you so much @${handle}! Your support means the world to us! 🙏✨`,
            general: `Hey @${handle}! Thanks for reaching out. How can we help you today? 😊`,
        };
        return replies[intent] || replies.general;
    }
};
exports.TwitterService = TwitterService;
exports.TwitterService = TwitterService = TwitterService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TwitterService);
//# sourceMappingURL=twitter.service.js.map