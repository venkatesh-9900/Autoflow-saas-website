import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceType, PlanTier } from '@prisma/client';

@Injectable()
export class PlatformSubscriptionsService {
  private readonly logger = new Logger(PlatformSubscriptionsService.name);

  constructor(private prisma: PrismaService) {}

  async getSubscriptions(organizationId: string) {
    return this.prisma.platformSubscription.findMany({
      where: { organizationId },
      orderBy: { serviceType: 'asc' },
    });
  }

  async getSubscription(organizationId: string, serviceType: ServiceType) {
    return this.prisma.platformSubscription.findUnique({
      where: {
        organizationId_serviceType: { organizationId, serviceType },
      },
    });
  }

  async subscribe(
    organizationId: string,
    serviceType: ServiceType,
    tier: PlanTier = PlanTier.FREE,
  ) {
    this.logger.log(
      `Subscribing org ${organizationId} to ${serviceType} (${tier})`,
    );

    const pricing = this.getPricing(serviceType, tier);

    return this.prisma.platformSubscription.upsert({
      where: {
        organizationId_serviceType: { organizationId, serviceType },
      },
      create: {
        organizationId,
        serviceType,
        active: true,
        tier,
        priceMonthly: pricing,
        features: this.getFeaturesByTier(serviceType, tier),
        billingCycleEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      update: {
        active: true,
        tier,
        priceMonthly: pricing,
        features: this.getFeaturesByTier(serviceType, tier),
        billingCycleEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
  }

  async unsubscribe(organizationId: string, serviceType: ServiceType) {
    this.logger.log(
      `Unsubscribing org ${organizationId} from ${serviceType}`,
    );

    return this.prisma.platformSubscription.update({
      where: {
        organizationId_serviceType: { organizationId, serviceType },
      },
      data: { active: false },
    });
  }

  async initializeAllSubscriptions(organizationId: string) {
    const services: ServiceType[] = [
      'INSTAGRAM', 'TWITTER', 'FACEBOOK', 'WHATSAPP', 'EMAIL', 'SMS', 'AI_CHATBOT',
    ];

    const subs = [];
    for (const serviceType of services) {
      const sub = await this.prisma.platformSubscription.upsert({
        where: {
          organizationId_serviceType: { organizationId, serviceType },
        },
        create: {
          organizationId,
          serviceType,
          active: false,
          tier: PlanTier.FREE,
          priceMonthly: 0,
        },
        update: {},
      });
      subs.push(sub);
    }
    return subs;
  }

  private getPricing(serviceType: ServiceType, tier: PlanTier): number {
    const pricing: Record<string, Record<string, number>> = {
      INSTAGRAM: { FREE: 0, STARTER: 29, PRO: 79, ENTERPRISE: 199 },
      TWITTER: { FREE: 0, STARTER: 19, PRO: 49, ENTERPRISE: 129 },
      FACEBOOK: { FREE: 0, STARTER: 29, PRO: 79, ENTERPRISE: 199 },
      WHATSAPP: { FREE: 0, STARTER: 39, PRO: 99, ENTERPRISE: 249 },
      EMAIL: { FREE: 0, STARTER: 19, PRO: 49, ENTERPRISE: 129 },
      SMS: { FREE: 0, STARTER: 29, PRO: 79, ENTERPRISE: 199 },
      AI_CHATBOT: { FREE: 0, STARTER: 49, PRO: 129, ENTERPRISE: 299 },
    };
    return pricing[serviceType]?.[tier] || 0;
  }

  private getFeaturesByTier(serviceType: ServiceType, tier: PlanTier): any {
    const features: Record<string, any> = {
      FREE: {
        automationRules: 2,
        aiResponses: 50,
        analytics: 'basic',
        support: 'community',
      },
      STARTER: {
        automationRules: 10,
        aiResponses: 500,
        analytics: 'standard',
        support: 'email',
        customResponses: true,
      },
      PRO: {
        automationRules: 50,
        aiResponses: 5000,
        analytics: 'advanced',
        support: 'priority',
        customResponses: true,
        webhooks: true,
        teamAccess: true,
      },
      ENTERPRISE: {
        automationRules: -1, // unlimited
        aiResponses: -1,
        analytics: 'enterprise',
        support: 'dedicated',
        customResponses: true,
        webhooks: true,
        teamAccess: true,
        whiteLabel: true,
        sla: '99.9%',
      },
    };
    return { serviceType, ...features[tier] };
  }
}
