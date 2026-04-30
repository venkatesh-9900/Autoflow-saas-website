import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceType } from '@prisma/client';

@Injectable()
export class AccountAnalyticsService {
  private readonly logger = new Logger(AccountAnalyticsService.name);

  constructor(private prisma: PrismaService) {}

  async getAnalytics(organizationId: string, platform?: ServiceType) {
    const where: any = { organizationId };
    if (platform) where.platform = platform;

    return this.prisma.accountAnalytics.findMany({
      where,
      orderBy: { snapshotDate: 'desc' },
      take: 30,
    });
  }

  async getLatestSnapshot(organizationId: string, platform: ServiceType) {
    return this.prisma.accountAnalytics.findFirst({
      where: { organizationId, platform },
      orderBy: { snapshotDate: 'desc' },
    });
  }

  async captureSnapshot(organizationId: string, platform: ServiceType) {
    this.logger.log(`Capturing analytics snapshot for ${platform}`);

    const metrics = this.generateMockMetrics(platform);

    return this.prisma.accountAnalytics.create({
      data: {
        organizationId,
        platform,
        ...metrics,
        snapshotDate: new Date(),
      },
    });
  }

  async getDashboardSummary(organizationId: string) {
    const platforms: ServiceType[] = [
      'INSTAGRAM', 'TWITTER', 'FACEBOOK', 'WHATSAPP', 'EMAIL', 'SMS',
    ];

    const summary = [];
    for (const platform of platforms) {
      const latest = await this.getLatestSnapshot(organizationId, platform);
      summary.push({
        platform,
        followersCount: latest?.followersCount || 0,
        engagementRate: latest?.engagementRate || 0,
        responseRate: latest?.responseRate || 0,
        postsCount: latest?.postsCount || 0,
      });
    }

    return summary;
  }

  private generateMockMetrics(platform: ServiceType): any {
    const base = {
      followersCount: Math.floor(Math.random() * 50000) + 1000,
      followingCount: Math.floor(Math.random() * 2000) + 100,
      postsCount: Math.floor(Math.random() * 500) + 50,
      engagementRate: parseFloat((Math.random() * 10 + 1).toFixed(2)),
      responseRate: parseFloat((Math.random() * 40 + 60).toFixed(2)),
      bestPostingTimes: ['09:00 AM', '12:30 PM', '6:00 PM', '8:00 PM'],
      hashtagStrategy: {
        top: ['#Automation', '#AI', '#Growth', '#Business', '#Tech'],
        trending: ['#2026Trends', '#AIRevolution'],
      },
      contentSuggestions: [
        'Post more carousel content for higher engagement',
        'Share behind-the-scenes stories',
        'Create short-form tutorial videos',
      ],
      metrics: { platform, generatedAt: new Date().toISOString() },
    };

    return base;
  }
}
