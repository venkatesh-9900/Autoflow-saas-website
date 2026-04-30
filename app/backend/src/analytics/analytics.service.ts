import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getStats(organizationId: string) {
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

    const messageStats = messages.reduce(
      (acc: Record<string, number>, curr: any) => {
        acc[curr.status] = curr._count;
        return acc;
      },
      {} as Record<string, number>,
    );

    const postStats = socialPosts.reduce(
      (acc: Record<string, number>, curr: any) => {
        acc[curr.status] = curr._count;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      totalMessages: Object.values(messageStats).reduce(
        (a: number, b: number) => a + b,
        0,
      ),
      deliveredMessages: messageStats['DELIVERED'] || 0,
      failedMessages: messageStats['FAILED'] || 0,
      activeCampaigns: campaigns,
      totalContacts: contacts,
      socialPosts: {
        total: Object.values(postStats).reduce(
          (a: number, b: number) => a + b,
          0,
        ),
        published: postStats['PUBLISHED'] || 0,
        scheduled: postStats['SCHEDULED'] || 0,
        failed: postStats['FAILED'] || 0,
        draft: postStats['DRAFT'] || 0,
      },
    };
  }
}
