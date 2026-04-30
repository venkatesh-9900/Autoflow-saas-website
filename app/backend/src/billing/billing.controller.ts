import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { BillingService } from './billing.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get()
  async getStatus(@Req() req: any) {
    return this.billingService.getBillingStatus(req.user.organizationId);
  }

  @Post('trial')
  async startTrial(@Req() req: any, @Body('serviceName') serviceName: string) {
    return this.billingService.startTrial(req.user.organizationId, serviceName);
  }

  @Post('subscribe')
  async subscribe(@Req() req: any, @Body('planId') planId: string) {
    return this.billingService.subscribe(req.user.organizationId, planId);
  }

  @Delete('subscribe/:planId')
  async cancelSubscription(@Req() req: any, @Param('planId') planId: string) {
    return this.billingService.cancelSubscription(
      req.user.organizationId,
      planId,
    );
  }
}
