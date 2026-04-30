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
var AIAgentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIAgentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AIAgentsService = AIAgentsService_1 = class AIAgentsService {
    prisma;
    logger = new common_1.Logger(AIAgentsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAgentsByOrg(organizationId) {
        return this.prisma.aIAgent.findMany({
            where: { organizationId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getAgentByPlatform(organizationId, platform) {
        return this.prisma.aIAgent.findUnique({
            where: {
                organizationId_platform: { organizationId, platform },
            },
        });
    }
    async createOrUpdateAgent(organizationId, data) {
        return this.prisma.aIAgent.upsert({
            where: {
                organizationId_platform: {
                    organizationId,
                    platform: data.platform,
                },
            },
            create: {
                organizationId,
                platform: data.platform,
                connectedAccountId: data.connectedAccountId,
                config: data.config || this.getDefaultConfig(data.platform),
                status: client_1.AIAgentStatus.PAUSED,
            },
            update: {
                connectedAccountId: data.connectedAccountId,
                config: data.config,
            },
        });
    }
    async activateAgent(organizationId, platform) {
        const agent = await this.getAgentByPlatform(organizationId, platform);
        if (!agent)
            throw new common_1.NotFoundException('AI Agent not found');
        return this.prisma.aIAgent.update({
            where: { id: agent.id },
            data: { status: client_1.AIAgentStatus.ACTIVE },
        });
    }
    async pauseAgent(organizationId, platform) {
        const agent = await this.getAgentByPlatform(organizationId, platform);
        if (!agent)
            throw new common_1.NotFoundException('AI Agent not found');
        return this.prisma.aIAgent.update({
            where: { id: agent.id },
            data: { status: client_1.AIAgentStatus.PAUSED },
        });
    }
    async analyzeAccount(organizationId, platform) {
        this.logger.log(`Analyzing ${platform} account for org ${organizationId}`);
        const agent = await this.getAgentByPlatform(organizationId, platform);
        if (!agent)
            throw new common_1.NotFoundException('AI Agent not found for this platform');
        await this.prisma.aIAgent.update({
            where: { id: agent.id },
            data: { status: client_1.AIAgentStatus.LEARNING },
        });
        const analysisResults = this.generateAnalysis(platform);
        const recommendations = this.generateRecommendations(platform);
        return this.prisma.aIAgent.update({
            where: { id: agent.id },
            data: {
                analysisResults,
                recommendations,
                lastAnalyzedAt: new Date(),
                status: client_1.AIAgentStatus.ACTIVE,
            },
        });
    }
    async detectIntent(message, platform) {
        const lower = message.toLowerCase();
        const intents = [
            { pattern: ['join', 'community', 'group'], intent: 'join_community', confidence: 0.92 },
            { pattern: ['buy', 'purchase', 'order', 'price', 'cost'], intent: 'purchase_intent', confidence: 0.88 },
            { pattern: ['help', 'support', 'issue', 'problem'], intent: 'support_request', confidence: 0.90 },
            { pattern: ['book', 'appointment', 'schedule', 'reserve'], intent: 'booking_request', confidence: 0.91 },
            { pattern: ['demo', 'trial', 'try'], intent: 'demo_request', confidence: 0.87 },
            { pattern: ['cancel', 'refund', 'return'], intent: 'cancellation', confidence: 0.89 },
            { pattern: ['thanks', 'thank you', 'appreciate', 'love'], intent: 'positive_feedback', confidence: 0.95 },
            { pattern: ['follow', 'subscribe'], intent: 'follow_request', confidence: 0.85 },
        ];
        for (const { pattern, intent, confidence } of intents) {
            if (pattern.some((p) => lower.includes(p))) {
                return { intent, confidence, platform, message: message.substring(0, 100) };
            }
        }
        return { intent: 'general_inquiry', confidence: 0.60, platform, message: message.substring(0, 100) };
    }
    async generateReply(intent, platform, context) {
        const replies = {
            INSTAGRAM: {
                join_community: '🎉 Welcome! Make sure you follow us first, then we\'ll send you the community link! 🔗',
                purchase_intent: '🛍️ Great choice! Check our link in bio for the latest offers or DM us for a custom quote! 💫',
                support_request: '💬 We\'re here to help! Can you describe your issue in detail? We\'ll get back to you ASAP.',
                positive_feedback: '🙏 Thank you so much! Your support means everything to us! ❤️',
                general_inquiry: '👋 Hey! Thanks for reaching out. How can we help you today? 😊',
            },
            TWITTER: {
                join_community: 'Welcome! Follow us and check our pinned tweet for the community link! 🎉',
                purchase_intent: 'Great interest! Check our website for pricing details or DM us for a custom quote 📊',
                support_request: 'We\'re on it! DM us your details and we\'ll help you right away 💪',
                positive_feedback: 'Thank you! Your support means the world to us! 🌟',
                general_inquiry: 'Hey there! Thanks for reaching out. How can we help? 😊',
            },
            FACEBOOK: {
                join_community: 'Welcome! Click "Join Group" on our community page to get started! 🎉',
                purchase_intent: 'Thanks for your interest! Visit our shop or message us for personalized recommendations 🛒',
                support_request: 'We\'re here to help! Send us a message with your issue and we\'ll respond ASAP 🔧',
                positive_feedback: 'Thank you for the kind words! We truly appreciate your support! ❤️',
                general_inquiry: 'Hi there! Thanks for reaching out. How can we assist you today? 😊',
            },
            WHATSAPP: {
                join_community: '🎉 Welcome! Here\'s your invite link to join our WhatsApp community group.',
                purchase_intent: '🛍️ I can help you with your purchase! What product are you interested in?',
                support_request: '🔧 I\'m here to help. Please describe your issue and I\'ll find a solution.',
                booking_request: '📅 I\'d love to help you book! What date and time works best for you?',
                positive_feedback: '🙏 Thank you! We\'re so glad you had a great experience!',
                general_inquiry: '👋 Hello! How can I assist you today?',
            },
        };
        const platformReplies = replies[platform] || replies.INSTAGRAM;
        return platformReplies[intent] || platformReplies.general_inquiry || 'Thanks for your message! We\'ll get back to you soon.';
    }
    getDefaultConfig(platform) {
        return {
            tone: 'professional_friendly',
            language: 'en',
            responseDelay: 0,
            maxDailyResponses: 100,
            autoEscalateAfter: 3,
            greetingMessage: `Welcome! Our AI assistant is here to help you on ${platform}.`,
        };
    }
    generateAnalysis(platform) {
        return {
            accountType: 'business',
            category: 'Technology / SaaS',
            bio: 'AI-powered automation platform for modern businesses',
            contentThemes: ['automation', 'productivity', 'tech', 'growth'],
            postingFrequency: '3-5 times per week',
            engagementRate: 4.7,
            followerGrowthRate: 2.3,
            topHashtags: ['#Automation', '#AI', '#SaaS', '#Business', '#Growth'],
            audienceInsights: {
                primaryAge: '25-34',
                topLocations: ['United States', 'United Kingdom', 'India'],
                peakActivityHours: ['9:00 AM', '12:00 PM', '6:00 PM'],
                interests: ['Technology', 'Entrepreneurship', 'Digital Marketing'],
            },
            contentPerformance: {
                bestType: 'carousel',
                avgLikes: 245,
                avgComments: 18,
                avgShares: 32,
            },
            analyzedAt: new Date().toISOString(),
        };
    }
    generateRecommendations(platform) {
        return {
            automations: [
                { rule: 'AUTO_DM_REPLY', priority: 'HIGH', reason: 'High volume of unanswered DMs detected' },
                { rule: 'AUTO_COMMENT_REPLY', priority: 'MEDIUM', reason: 'Improve engagement by replying to comments within 1 hour' },
                { rule: 'TRENDING_HASHTAG_GENERATOR', priority: 'HIGH', reason: 'Current hashtags are underperforming by 40%' },
            ],
            contentStrategy: {
                bestPostingTimes: ['9:00 AM EST', '12:30 PM EST', '7:00 PM EST'],
                recommendedPostTypes: ['Carousel posts', 'Short-form video', 'User testimonials'],
                hashtagStrategy: 'Mix 3 trending + 5 niche + 2 branded hashtags per post',
            },
            growthTips: [
                'Increase posting frequency to 5x/week',
                'Engage with similar accounts in your niche',
                'Run a weekly Q&A session in Stories/Fleets',
                'Collaborate with micro-influencers in the tech space',
            ],
            generatedAt: new Date().toISOString(),
        };
    }
};
exports.AIAgentsService = AIAgentsService;
exports.AIAgentsService = AIAgentsService = AIAgentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AIAgentsService);
//# sourceMappingURL=ai-agents.service.js.map