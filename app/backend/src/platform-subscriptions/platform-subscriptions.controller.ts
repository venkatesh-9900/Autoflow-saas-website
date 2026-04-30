import { Controller, Get, Post, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { PlatformSubscriptionsService } from './platform-subscriptions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ServiceType, PlanTier } from '@prisma/client';

@Controller('platform-subscriptions')
@UseGuards(JwtAuthGuard)
export class PlatformSubscriptionsController {
  constructor(
    private readonly subscriptionsService: PlatformSubscriptionsService,
  ) {}

  @Get()
  async getAll(@Req() req: any) {
    return this.subscriptionsService.getSubscriptions(
      req.user.organizationId,
    );
  }

  @Get(':serviceType')
  async getOne(
    @Req() req: any,
    @Param('serviceType') serviceType: ServiceType,
  ) {
    return this.subscriptionsService.getSubscription(
      req.user.organizationId,
      serviceType,
    );
  }

  @Post('subscribe')
  async subscribe(
    @Req() req: any,
    @Body() body: { serviceType: ServiceType; tier?: PlanTier },
  ) {
    return this.subscriptionsService.subscribe(
      req.user.organizationId,
      body.serviceType,
      body.tier,
    );
  }

  @Post('unsubscribe')
  async unsubscribe(
    @Req() req: any,
    @Body() body: { serviceType: ServiceType },
  ) {
    return this.subscriptionsService.unsubscribe(
      req.user.organizationId,
      body.serviceType,
    );
  }

  @Post('initialize')
  async initializeAll(@Req() req: any) {
    return this.subscriptionsService.initializeAllSubscriptions(
      req.user.organizationId,
    );
  }
}
