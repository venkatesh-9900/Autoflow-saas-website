import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  findAll(@Req() req: any) {
    return this.messagesService.findAll(req.user.orgId);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.messagesService.findOne(id, req.user.orgId);
  }
}
