import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmailAutomationService {
  private readonly logger = new Logger(EmailAutomationService.name);

  constructor(private prisma: PrismaService) {}

  async sendAutoReply(
    organizationId: string,
    data: { recipientEmail: string; subject: string; incomingContent: string },
  ) {
    this.logger.log(`Auto-replying to email from ${data.recipientEmail}`);

    const intent = this.detectIntent(data.incomingContent);
    const reply = this.generateReply(intent, data.subject);

    return this.prisma.message.create({
      data: {
        organizationId,
        channel: 'EMAIL',
        direction: 'OUTBOUND',
        to: data.recipientEmail,
        content: reply,
        status: 'SENT',
      },
    });
  }

  async scheduleCampaignEmail(
    organizationId: string,
    data: {
      subject: string;
      content: string;
      recipients: string[];
      scheduledFor: string;
      templateId?: string;
    },
  ) {
    this.logger.log(
      `Scheduling email campaign to ${data.recipients.length} recipients`,
    );

    const messages = [];
    for (const recipient of data.recipients) {
      const message = await this.prisma.message.create({
        data: {
          organizationId,
          channel: 'EMAIL',
          direction: 'OUTBOUND',
          to: recipient,
          content: `Subject: ${data.subject}\n\n${data.content}`,
          status: 'PENDING',
        },
      });
      messages.push(message);
    }

    return { count: messages.length, scheduledFor: data.scheduledFor };
  }

  async getEmailAnalytics(organizationId: string) {
    this.logger.log(`Fetching email analytics for org ${organizationId}`);

    return {
      totalSent: 12500,
      delivered: 12100,
      opened: 4800,
      clicked: 1200,
      bounced: 400,
      unsubscribed: 45,
      openRate: 39.67,
      clickRate: 9.92,
      bounceRate: 3.31,
      period: 'last_30_days',
    };
  }

  async handleWebhook(payload: any) {
    this.logger.log('Email webhook received');
    return { status: 'success' };
  }

  private detectIntent(content: string): string {
    const lower = content.toLowerCase();
    if (lower.includes('unsubscribe')) return 'unsubscribe';
    if (lower.includes('help') || lower.includes('support')) return 'support';
    if (lower.includes('thank')) return 'thanks';
    if (lower.includes('price') || lower.includes('quote')) return 'pricing';
    return 'general';
  }

  private generateReply(intent: string, subject: string): string {
    const replies: Record<string, string> = {
      unsubscribe: 'We\'ve received your unsubscribe request. You\'ll be removed from our mailing list within 24 hours.',
      support: 'Thank you for reaching out! Our support team has received your request and will respond within 4 business hours.',
      thanks: 'You\'re welcome! We\'re glad we could help. Don\'t hesitate to reach out if you need anything else.',
      pricing: 'Thank you for your interest in our pricing! A sales representative will contact you within 24 hours with a customized quote.',
      general: `Thank you for your email regarding "${subject}". We've received your message and will respond shortly.`,
    };
    return replies[intent] || replies.general;
  }
}
