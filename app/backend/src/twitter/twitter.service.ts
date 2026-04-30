import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TwitterService {
  private readonly logger = new Logger(TwitterService.name);

  constructor(private prisma: PrismaService) {}

  async scheduleTweet(
    organizationId: string,
    data: { content: string; scheduledFor?: string; hashtags?: string[] },
  ) {
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

  async autoReplyToMention(
    organizationId: string,
    mentionData: { mentionId: string; authorHandle: string; content: string },
  ) {
    this.logger.log(
      `Processing mention from @${mentionData.authorHandle}: ${mentionData.content}`,
    );

    // AI-driven intent detection + reply generation (mock)
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

  async detectTrendingHashtags(organizationId: string) {
    this.logger.log(`Detecting trending hashtags for org ${organizationId}`);

    // Mock trending hashtag detection
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

  async getEngagementMetrics(organizationId: string) {
    this.logger.log(`Fetching engagement metrics for org ${organizationId}`);

    // Mock engagement data
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

  async handleWebhook(payload: any) {
    this.logger.log('Twitter webhook received');
    return { status: 'success' };
  }

  private detectIntent(content: string): string {
    const lower = content.toLowerCase();
    if (lower.includes('help') || lower.includes('support')) return 'support';
    if (lower.includes('price') || lower.includes('cost')) return 'pricing';
    if (lower.includes('bug') || lower.includes('issue')) return 'bug_report';
    if (lower.includes('thanks') || lower.includes('love')) return 'positive';
    return 'general';
  }

  private generateReply(intent: string, handle: string): string {
    const replies: Record<string, string> = {
      support: `Hey @${handle}! We're here to help. DM us and we'll get you sorted right away! 💪`,
      pricing: `Hi @${handle}! Check out our pricing page for the latest plans. DM us for custom enterprise quotes! 📊`,
      bug_report: `Thanks for flagging this @${handle}! Our team is looking into it. We'll keep you updated. 🔧`,
      positive: `Thank you so much @${handle}! Your support means the world to us! 🙏✨`,
      general: `Hey @${handle}! Thanks for reaching out. How can we help you today? 😊`,
    };
    return replies[intent] || replies.general;
  }
}
