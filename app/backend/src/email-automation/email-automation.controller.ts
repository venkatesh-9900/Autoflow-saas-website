import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { EmailAutomationService } from './email-automation.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('email-automation')
@UseGuards(JwtAuthGuard)
export class EmailAutomationController {
  constructor(private readonly emailService: EmailAutomationService) {}

  @Post('auto-reply')
  async autoReply(@Req() req: any, @Body() body: any) {
    return this.emailService.sendAutoReply(req.user.organizationId, body);
  }

  @Post('schedule-campaign')
  async scheduleCampaign(@Req() req: any, @Body() body: any) {
    return this.emailService.scheduleCampaignEmail(
      req.user.organizationId,
      body,
    );
  }

  @Get('analytics')
  async getAnalytics(@Req() req: any) {
    return this.emailService.getEmailAnalytics(req.user.organizationId);
  }

  @Post('webhook')
  async handleWebhook(@Body() payload: any) {
    return this.emailService.handleWebhook(payload);
  }
}
