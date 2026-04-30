import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('facebook')
@UseGuards(JwtAuthGuard)
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) {}

  @Post('post')
  async createPost(@Req() req: any, @Body() body: any) {
    return this.facebookService.createPost(req.user.organizationId, body);
  }

  @Post('moderate-comment')
  async moderateComment(@Req() req: any, @Body() body: any) {
    return this.facebookService.moderateComment(req.user.organizationId, body);
  }

  @Post('messenger-reply')
  async messengerReply(@Req() req: any, @Body() body: any) {
    return this.facebookService.sendMessengerReply(
      req.user.organizationId,
      body,
    );
  }

  @Get('lead-workflow')
  async getLeadWorkflow(@Req() req: any) {
    return this.facebookService.generateLeadWorkflow(req.user.organizationId);
  }

  @Get('insights')
  async getInsights(@Req() req: any) {
    return this.facebookService.getPageInsights(req.user.organizationId);
  }

  @Post('webhook')
  async handleWebhook(@Body() payload: any) {
    return this.facebookService.handleWebhook(payload);
  }
}
