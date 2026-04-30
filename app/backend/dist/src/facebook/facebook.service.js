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
var FacebookService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FacebookService = FacebookService_1 = class FacebookService {
    prisma;
    logger = new common_1.Logger(FacebookService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPost(organizationId, data) {
        this.logger.log(`Creating Facebook post for org ${organizationId}`);
        return this.prisma.message.create({
            data: {
                organizationId,
                channel: 'FACEBOOK',
                to: 'facebook_page',
                content: data.content,
                status: data.scheduledFor ? 'PENDING' : 'SENT',
            },
        });
    }
    async moderateComment(organizationId, commentData) {
        this.logger.log(`Moderating comment on post ${commentData.postId}`);
        const sentiment = this.analyzeSentiment(commentData.content);
        const action = sentiment === 'negative' ? 'FLAG' : sentiment === 'spam' ? 'HIDE' : 'APPROVE';
        return {
            commentId: commentData.commentId,
            sentiment,
            action,
            autoReply: action === 'APPROVE'
                ? `Thanks for your feedback, ${commentData.authorName}! 🙏`
                : null,
        };
    }
    async sendMessengerReply(organizationId, data) {
        this.logger.log(`Sending Messenger reply to ${data.recipientId}`);
        return this.prisma.message.create({
            data: {
                organizationId,
                channel: 'FACEBOOK',
                direction: 'OUTBOUND',
                to: data.recipientId,
                content: data.content,
                status: 'SENT',
            },
        });
    }
    async generateLeadWorkflow(organizationId) {
        this.logger.log(`Generating lead workflow for org ${organizationId}`);
        return {
            workflow: {
                trigger: 'NEW_PAGE_MESSAGE',
                steps: [
                    { id: 1, action: 'DETECT_INTENT', description: 'Analyze message intent' },
                    { id: 2, action: 'QUALIFY_LEAD', description: 'Check lead qualification criteria' },
                    { id: 3, action: 'SEND_REPLY', description: 'Send personalized response' },
                    { id: 4, action: 'ADD_TO_CRM', description: 'Create contact in CRM' },
                    { id: 5, action: 'NOTIFY_TEAM', description: 'Alert sales team' },
                ],
            },
        };
    }
    async getPageInsights(organizationId) {
        this.logger.log(`Fetching page insights for org ${organizationId}`);
        return {
            pageViews: 15200,
            pageLikes: 8400,
            postReach: 32000,
            postEngagement: 4500,
            messengerConversations: 250,
            responseRate: 94.5,
            avgResponseTime: '12 minutes',
            period: 'last_7_days',
        };
    }
    async handleWebhook(payload) {
        this.logger.log('Facebook webhook received');
        return { status: 'success' };
    }
    analyzeSentiment(content) {
        const lower = content.toLowerCase();
        const spam = ['buy now', 'click here', 'free money', 'dm me for'];
        const negative = ['terrible', 'worst', 'hate', 'scam', 'fraud'];
        if (spam.some((s) => lower.includes(s)))
            return 'spam';
        if (negative.some((n) => lower.includes(n)))
            return 'negative';
        return 'positive';
    }
};
exports.FacebookService = FacebookService;
exports.FacebookService = FacebookService = FacebookService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FacebookService);
//# sourceMappingURL=facebook.service.js.map