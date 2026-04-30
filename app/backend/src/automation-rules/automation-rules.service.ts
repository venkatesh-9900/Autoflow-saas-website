import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceType, AutomationRuleType } from '@prisma/client';

@Injectable()
export class AutomationRulesService {
  private readonly logger = new Logger(AutomationRulesService.name);

  constructor(private prisma: PrismaService) {}

  async getRulesByOrg(organizationId: string) {
    return this.prisma.automationRule.findMany({
      where: { organizationId },
      orderBy: [{ platform: 'asc' }, { ruleType: 'asc' }],
    });
  }

  async getRulesByPlatform(organizationId: string, platform: ServiceType) {
    return this.prisma.automationRule.findMany({
      where: { organizationId, platform },
      orderBy: { ruleType: 'asc' },
    });
  }

  async toggleRule(
    organizationId: string,
    platform: ServiceType,
    ruleType: AutomationRuleType,
    enabled: boolean,
  ) {
    this.logger.log(
      `Toggling ${ruleType} on ${platform} to ${enabled ? 'ON' : 'OFF'}`,
    );

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

  async updateRuleConfig(
    organizationId: string,
    platform: ServiceType,
    ruleType: AutomationRuleType,
    config: any,
  ) {
    const rule = await this.prisma.automationRule.findUnique({
      where: {
        organizationId_platform_ruleType: {
          organizationId,
          platform,
          ruleType,
        },
      },
    });

    if (!rule) throw new NotFoundException('Automation rule not found');

    return this.prisma.automationRule.update({
      where: { id: rule.id },
      data: { config },
    });
  }

  async getEnabledRulesCount(organizationId: string) {
    return this.prisma.automationRule.count({
      where: { organizationId, enabled: true },
    });
  }

  async initializeDefaultRules(
    organizationId: string,
    platform: ServiceType,
  ) {
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

  private getRuleTypesForPlatform(platform: ServiceType): AutomationRuleType[] {
    const map: Record<string, AutomationRuleType[]> = {
      INSTAGRAM: [
        'AUTO_DM_REPLY', 'AUTO_COMMENT_REPLY', 'AUTO_FOLLOW_REPLY',
        'AUTO_POST_CONTENT', 'AUTO_REELS_POSTING', 'AUTO_CAROUSEL_POSTING',
        'TRENDING_HASHTAG_GENERATOR', 'FOLLOWER_GROWTH_MONITOR',
      ] as AutomationRuleType[],
      TWITTER: [
        'TWEET_SCHEDULE', 'AUTO_MENTION_REPLY', 'TRENDING_DETECT', 'ENGAGEMENT_MONITOR',
      ] as AutomationRuleType[],
      FACEBOOK: [
        'FB_POST_AUTOMATION', 'FB_COMMENT_MODERATION', 'FB_MESSENGER_CHATBOT', 'FB_LEAD_GENERATION',
      ] as AutomationRuleType[],
      WHATSAPP: [
        'WA_CHATBOT_REPLY', 'WA_APPOINTMENT_BOOKING', 'WA_CUSTOMER_SUPPORT', 'WA_SALES_ASSISTANT',
      ] as AutomationRuleType[],
      EMAIL: [
        'EMAIL_AUTO_REPLY', 'EMAIL_CAMPAIGN_SCHEDULE',
      ] as AutomationRuleType[],
      SMS: [
        'SMS_AUTO_REPLY', 'SMS_CAMPAIGN_SCHEDULE',
      ] as AutomationRuleType[],
    };
    return map[platform] || [];
  }

  private getDefaultConfig(ruleType: AutomationRuleType): any {
    const configs: Record<string, any> = {
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
}
