import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('instagram')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  @Post('webhook')
  handleWebhook(@Body() payload: any) {
    return this.instagramService.handleWebhook(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('send')
  sendDM(
    @Req() req: any,
    @Body() body: { recipientId: string; content: string },
  ) {
    return this.instagramService.sendDirectMessage(
      body.recipientId,
      body.content,
      req.user.orgId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('posts')
  createPost(@Req() req: any, @Body() body: any) {
    return this.instagramService.createPost(
      req.user.orgId || req.user.organizationId,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('posts/bulk')
  createBulkPosts(@Req() req: any, @Body() body: any) {
    return this.instagramService.createBulkPosts(
      req.user.orgId || req.user.organizationId,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('posts')
  getPosts(@Req() req: any) {
    return this.instagramService.getPosts(
      req.user.orgId || req.user.organizationId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('posts/:id/sync-metrics')
  syncMetrics(@Param('id') id: string) {
    return this.instagramService.syncPostMetrics(id);
  }
}
