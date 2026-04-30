import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { SmsAutomationService } from './sms-automation.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('sms-automation')
@UseGuards(JwtAuthGuard)
export class SmsAutomationController {
  constructor(private readonly smsService: SmsAutomationService) {}

  @Post('auto-reply')
  async autoReply(@Req() req: any, @Body() body: any) {
    return this.smsService.sendAutoReply(req.user.organizationId, body);
  }

  @Post('schedule-campaign')
  async scheduleCampaign(@Req() req: any, @Body() body: any) {
    return this.smsService.scheduleCampaign(req.user.organizationId, body);
  }

  @Get('analytics')
  async getAnalytics(@Req() req: any) {
    return this.smsService.getSmsAnalytics(req.user.organizationId);
  }

  @Post('webhook')
  async handleWebhook(@Body() payload: any) {
    return this.smsService.handleWebhook(payload);
  }
}
