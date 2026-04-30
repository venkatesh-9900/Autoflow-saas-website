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
var AutomationRulesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomationRulesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AutomationRulesService = AutomationRulesService_1 = class AutomationRulesService {
    prisma;
    logger = new common_1.Logger(AutomationRulesService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getRulesByOrg(organizationId) {
        return this.prisma.automationRule.findMany({
            where: { organizationId },
            orderBy: [{ platform: 'asc' }, { ruleType: 'asc' }],
        });
    }
    async getRulesByPlatform(organizationId, platform) {
        return this.prisma.automationRule.findMany({
            where: { organizationId, platform },
            orderBy: { ruleType: 'asc' },
        });
    }
    async toggleRule(organizationId, platform, ruleType, enabled) {
        this.logger.log(`Toggling ${ruleType} on ${platform} to ${enabled ? 'ON' : 'OFF'}`);
        return this.prisma.automationRule.upsert({
            where: {
                organizationId_platform_ruleType: {
                    organizationId,
                    platform,
                    ruleType,
                },
            },
            create: {
                organizationId,
                platform,
                ruleType,
                enabled,
                config: this.getDefaultConfig(ruleType),
            },
            update: { enabled },
        });
    }
    async updateRuleConfig(organizationId, platform, ruleType, config) {
        const rule = await this.prisma.automationRule.findUnique({
            where: {
                organizationId_platform_ruleType: {
                    organizationId,
                    platform,
                    ruleType,
                },
            },
        });
        if (!rule)
            throw new common_1.NotFoundException('Automation rule not found');
        return this.prisma.automationRule.update({
            where: { id: rule.id },
            data: { config },
        });
    }
    async getEnabledRulesCount(organizationId) {
        return this.prisma.automationRule.count({
            where: { organizationId, enabled: true },
        });
    }
    async initializeDefaultRules(organizationId, platform) {
        const ruleTypes = this.getRuleTypesForPlatform(platform);
        const rules = [];
        for (const ruleType of ruleTypes) {
            const rule = await this.prisma.automationRule.upsert({
                where: {
                    organizationId_platform_ruleType: {
                        organizationId,
                        platform,
                        ruleType,
                    },
                },
                create: {
                    organizationId,
                    platform,
                    ruleType,
                    enabled: false,
                    config: this.getDefaultConfig(ruleType),
                },
                update: {},
            });
            rules.push(rule);
        }
        return rules;
    }
    getRuleTypesForPlatform(platform) {
        const map = {
            INSTAGRAM: [
                'AUTO_DM_REPLY', 'AUTO_COMMENT_REPLY', 'AUTO_FOLLOW_REPLY',
                'AUTO_POST_CONTENT', 'AUTO_REELS_POSTING', 'AUTO_CAROUSEL_POSTING',
                'TRENDING_HASHTAG_GENERATOR', 'FOLLOWER_GROWTH_MONITOR',
            ],
            TWITTER: [
                'TWEET_SCHEDULE', 'AUTO_MENTION_REPLY', 'TRENDING_DETECT', 'ENGAGEMENT_MONITOR',
            ],
            FACEBOOK: [
                'FB_POST_AUTOMATION', 'FB_COMMENT_MODERATION', 'FB_MESSENGER_CHATBOT', 'FB_LEAD_GENERATION',
            ],
            WHATSAPP: [
                'WA_CHATBOT_REPLY', 'WA_APPOINTMENT_BOOKING', 'WA_CUSTOMER_SUPPORT', 'WA_SALES_ASSISTANT',
            ],
            EMAIL: [
                'EMAIL_AUTO_REPLY', 'EMAIL_CAMPAIGN_SCHEDULE',
            ],
            SMS: [
                'SMS_AUTO_REPLY', 'SMS_CAMPAIGN_SCHEDULE',
            ],
        };
        return map[platform] || [];
    }
    getDefaultConfig(ruleType) {
        const configs = {
            AUTO_DM_REPLY: {
                responseDelay: 0,
                customResponses: [],
                useAI: true,
                maxDailyReplies: 100,
            },
            AUTO_COMMENT_REPLY: {
                replyToPositive: true,
                replyToQuestions: true,
                hideSpam: true,
                customResponses: [],
            },
            AUTO_FOLLOW_REPLY: {
                welcomeMessage: 'Welcome to our community! 🎉',
                sendDM: true,
            },
            AUTO_POST_CONTENT: {
                autoCaption: true,
                autoHashtags: true,
                postingSchedule: ['09:00', '12:00', '18:00'],
            },
            TRENDING_HASHTAG_GENERATOR: {
                maxHashtags: 10,
                includeNiche: true,
                includeTrending: true,
            },
            WA_CHATBOT_REPLY: {
                greetingMessage: 'Hello! How can I help you today?',
                useAI: true,
                escalateAfterAttempts: 3,
            },
            WA_APPOINTMENT_BOOKING: {
                availableDays: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
                availableHours: { start: '09:00', end: '17:00' },
                slotDuration: 30,
            },
        };
        return configs[ruleType] || { useAI: true };
    }
};
exports.AutomationRulesService = AutomationRulesService;
exports.AutomationRulesService = AutomationRulesService = AutomationRulesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AutomationRulesService);
//# sourceMappingURL=automation-rules.service.js.map