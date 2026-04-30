import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('twitter')
@UseGuards(JwtAuthGuard)
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  @Post('tweet')
  async scheduleTweet(@Req() req: any, @Body() body: any) {
    return this.twitterService.scheduleTweet(req.user.organizationId, body);
  }

  @Post('reply-mention')
  async replyToMention(@Req() req: any, @Body() body: any) {
    return this.twitterService.autoReplyToMention(
      req.user.organizationId,
      body,
    );
  }

  @Get('trending')
  async getTrending(@Req() req: any) {
    return this.twitterService.detectTrendingHashtags(req.user.organizationId);
  }

  @Get('engagement')
  async getEngagement(@Req() req: any) {
    return this.twitterService.getEngagementMetrics(req.user.organizationId);
  }

  @Post('webhook')
  async handleWebhook(@Body() payload: any) {
    return this.twitterService.handleWebhook(payload);
  }
}
