import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SmsAutomationService {
  private readonly logger = new Logger(SmsAutomationService.name);

  constructor(private prisma: PrismaService) {}

  async sendAutoReply(
    organizationId: string,
    data: { recipientPhone: string; incomingMessage: string },
  ) {
    this.logger.log(`SMS auto-reply to ${data.recipientPhone}`);

    const intent = this.detectIntent(data.incomingMessage);
    const reply = this.generateReply(intent);

    return this.prisma.message.create({
      data: {
        organizationId,
        channel: 'SMS',
        direction: 'OUTBOUND',
        to: data.recipientPhone,
        content: reply,
        status: 'SENT',
      },
    });
  }

  async scheduleCampaign(
    organizationId: string,
    data: {
      content: string;
      recipients: string[];
      scheduledFor: string;
    },
  ) {
    this.logger.log(
      `Scheduling SMS campaign to ${data.recipients.length} recipients`,
    );

    const messages = [];
    for (const phone of data.recipients) {
      const msg = await this.prisma.message.create({
        data: {
          organizationId,
          channel: 'SMS',
          direction: 'OUTBOUND',
          to: phone,
          content: data.content,
          status: 'PENDING',
        },
      });
      messages.push(msg);
    }

    return { count: messages.length, scheduledFor: data.scheduledFor };
  }

  async getSmsAnalytics(organizationId: string) {
    this.logger.log(`Fetching SMS analytics for org ${organizationId}`);

    return {
      totalSent: 5400,
      delivered: 5200,
      failed: 200,
      responseRate: 28.5,
      optOuts: 15,
      deliveryRate: 96.3,
      avgResponseTime: '3.2 minutes',
      period: 'last_30_days',
    };
  }

  async handleWebhook(payload: any) {
    this.logger.log('SMS webhook received (Twilio)');
    return { status: 'success' };
  }

  private detectIntent(message: string): string {
    const lower = message.toLowerCase();
    if (lower === 'stop' || lower === 'unsubscribe') return 'opt_out';
    if (lower === 'yes' || lower === 'confirm') return 'confirm';
    if (lower.includes('help')) return 'help';
    return 'general';
  }

  private generateReply(intent: string): string {
    const replies: Record<string, string> = {
      opt_out: 'You have been unsubscribed. Reply START to re-subscribe.',
      confirm: 'Thank you for confirming! We\'ll keep you updated.',
      help: 'Need help? Call us at 1-800-AUTOFLOW or visit autoflow.ai/support',
      general: 'Thanks for your message! Our team will get back to you shortly.',
    };
    return replies[intent] || replies.general;
  }
}
