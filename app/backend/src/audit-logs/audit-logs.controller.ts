import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuditLogsService } from './audit-logs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('audit-logs')
@UseGuards(JwtAuthGuard)
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Get()
  async getLogs(@Req() req: any) {
    return this.auditLogsService.getLogs(req.user.orgId);
  }
}
