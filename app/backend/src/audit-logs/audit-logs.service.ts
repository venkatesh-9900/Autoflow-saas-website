import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditLogsService {
  constructor(private prisma: PrismaService) {}

  async log(data: {
    organizationId: string;
    userId?: string;
    action: string;
    entityType: string;
    entityId?: string;
    metadata?: any;
  }) {
    return this.prisma.auditLog.create({
      data,
    });
  }

  async getLogs(organizationId: string) {
    return this.prisma.auditLog.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }
}
