import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InboxService } from './inbox.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/inbox')
@UseGuards(JwtAuthGuard)
export class InboxController {
  constructor(private inboxService: InboxService) {}

  @Get('threads')
  async getThreads(@Request() req: any) {
    return this.inboxService.getThreads(req.user.organizationId);
  }

  @Get('thread/:contactId')
  async getThreadMessages(
    @Request() req: any,
    @Param('contactId') contactId: string,
  ) {
    // Decoding contactId if it contains phone number formatting
    return this.inboxService.getThreadMessages(
      req.user.organizationId,
      decodeURIComponent(contactId),
    );
  }

  @Patch('thread/:contactId/assign')
  async assignThread(
    @Request() req: any,
    @Param('contactId') contactId: string,
    @Body('assigneeId') assigneeId: string,
  ) {
    return this.inboxService.assignThread(
      req.user.organizationId,
      decodeURIComponent(contactId),
      assigneeId,
    );
  }

  @Patch('message/:messageId/note')
  async addNote(
    @Request() req: any,
    @Param('messageId') messageId: string,
    @Body('note') note: string,
  ) {
    return this.inboxService.addInternalNote(
      req.user.organizationId,
      messageId,
      note,
    );
  }
}
