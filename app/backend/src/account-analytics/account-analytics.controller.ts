import { Controller, Get, Post, Param, Req, UseGuards } from '@nestjs/common';
import { AccountAnalyticsService } from './account-analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ServiceType } from '@prisma/client';

@Controller('account-analytics')
@UseGuards(JwtAuthGuard)
export class AccountAnalyticsController {
  constructor(
    private readonly analyticsService: AccountAnalyticsService,
  ) {}

  @Get()
  async getAll(@Req() req: any) {
    return this.analyticsService.getAnalytics(req.user.organizationId);
  }

  @Get('dashboard')
  async getDashboard(@Req() req: any) {
    return this.analyticsService.getDashboardSummary(
      req.user.organizationId,
    );
  }

  @Get(':platform')
  async getByPlatform(
    @Req() req: any,
    @Param('platform') platform: ServiceType,
  ) {
    return this.analyticsService.getAnalytics(
      req.user.organizationId,
      platform,
    );
  }

  @Get(':platform/latest')
  async getLatest(
    @Req() req: any,
    @Param('platform') platform: ServiceType,
  ) {
    return this.analyticsService.getLatestSnapshot(
      req.user.organizationId,
      platform,
    );
  }

  @Post(':platform/capture')
  async capture(
    @Req() req: any,
    @Param('platform') platform: ServiceType,
  ) {
    return this.analyticsService.captureSnapshot(
      req.user.organizationId,
      platform,
    );
  }
}
