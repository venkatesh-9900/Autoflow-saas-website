import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
} from '@nestjs/common';
import { CommunityService } from './community.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('community')
@UseGuards(JwtAuthGuard)
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post('broadcast')
  broadcast(
    @Req() req: any,
    @Body() body: { content: string; channel: 'WHATSAPP' | 'COMMUNITY' },
  ) {
    return this.communityService.broadcast(
      req.user.orgId,
      body.content,
      body.channel,
    );
  }

  @Get('join-link/:groupId')
  getJoinLink(@Req() req: any, @Param('groupId') groupId: string) {
    return this.communityService.generateJoinLink(req.user.orgId, groupId);
  }
}
