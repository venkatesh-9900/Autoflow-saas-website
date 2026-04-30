import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class BillingService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async getBillingStatus(organizationId: string) {
    const subscriptions = await this.prisma.serviceSubscription.findMany({
      where: { organizationId, status: 'ACTIVE' },
    });

    const trials = await this.prisma.trialSubscription.findMany({
      where: { organizationId, isConverted: false },
    });

    return {
      subscriptions,
      trials,
      isPro: subscriptions.some((sub: any) => sub.planId === 'pro_bundle'),
    };
  }

  async startTrial(organizationId: string, serviceName: string) {
    const { isPro } = await this.getBillingStatus(organizationId);
    if (isPro) {
      throw new BadRequestException('Pro users do not need individual trials.');
    }

    if (serviceName === 'pro_bundle') {
      throw new BadRequestException(
        'Free trial does not apply to the Pro bundle.',
      );
    }

    const existingTrial = await this.prisma.trialSubscription.findUnique({
      where: { organizationId_serviceName: { organizationId, serviceName } },
    });

    if (existingTrial) {
      throw new BadRequestException(`Trial already used for ${serviceName}.`);
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const trial = await this.prisma.trialSubscription.create({
      data: {
        organizationId,
        serviceName,
        expiresAt,
      },
    });

    await this.notificationsService.triggerAlert(
      organizationId,
      'Trial Started',
      `Your 7-day free trial for ${serviceName} has started!`,
      'SUCCESS',
    );

    return trial;
  }

  async subscribe(organizationId: string, planId: string) {
    // Mock Stripe subscription process
    const currentPeriodEnd = new Date();
    currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);

    if (planId === 'pro_bundle') {
      // Cancel individual ones when upgrading to Pro
      await this.prisma.serviceSubscription.deleteMany({
        where: { organizationId, planId: { not: 'pro_bundle' } },
      });
    }

    const subscription = await this.prisma.serviceSubscription.upsert({
      where: { organizationId_planId: { organizationId, planId } },
      create: {
        organizationId,
        planId,
        status: 'ACTIVE',
        currentPeriodEnd,
      },
      update: {
        status: 'ACTIVE',
        currentPeriodEnd,
      },
    });

    // Convert trial if applicable
    await this.prisma.trialSubscription.updateMany({
      where: { organizationId, serviceName: planId },
      data: { isConverted: true },
    });

    return subscription;
  }

  async cancelSubscription(organizationId: string, planId: string) {
    return this.prisma.serviceSubscription.update({
      where: { organizationId_planId: { organizationId, planId } },
      data: { status: 'CANCELED' },
    });
  }
}
