import {
  Controller,
  Sse,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get('history')
  async getHistory(@Request() req: any) {
    return this.notificationsService.getHistory(req.user.organizationId);
  }

  @Sse('stream')
  streamEvents(@Request() req: any): Observable<MessageEvent> {
    // NestJS Server-Sent Events endpoint
    // Frontend will connect via `new EventSource('/api/notifications/stream')`
    // Note: SSE + JWT require careful token passing (often via URL query if EventSource doesn't support headers)
    return this.notificationsService.getEventsStream(req.user.organizationId);
  }

  // Test endpoint to verify the notification system working
  @Post('test-trigger')
  async testTrigger(
    @Request() req: any,
    @Body() body: { title: string; message: string },
  ) {
    return this.notificationsService.triggerAlert(
      req.user.organizationId,
      body.title || 'Test Alert',
      body.message || 'This is a test notification.',
    );
  }
}
