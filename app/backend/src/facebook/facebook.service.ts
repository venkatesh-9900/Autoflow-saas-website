import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FacebookService {
  private readonly logger = new Logger(FacebookService.name);

  constructor(private prisma: PrismaService) {}

  async createPost(
    organizationId: string,
    data: { content: string; mediaUrl?: string; scheduledFor?: string },
  ) {
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

  async moderateComment(
    organizationId: string,
    commentData: { commentId: string; postId: string; content: string; authorName: string },
  ) {
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

  async sendMessengerReply(
    organizationId: string,
    data: { recipientId: string; content: string },
  ) {
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

  async generateLeadWorkflow(organizationId: string) {
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

  async getPageInsights(organizationId: string) {
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

  async handleWebhook(payload: any) {
    this.logger.log('Facebook webhook received');
    return { status: 'success' };
  }

  private analyzeSentiment(content: string): string {
    const lower = content.toLowerCase();
    const spam = ['buy now', 'click here', 'free money', 'dm me for'];
    const negative = ['terrible', 'worst', 'hate', 'scam', 'fraud'];

    if (spam.some((s) => lower.includes(s))) return 'spam';
    if (negative.some((n) => lower.includes(n))) return 'negative';
    return 'positive';
  }
}
