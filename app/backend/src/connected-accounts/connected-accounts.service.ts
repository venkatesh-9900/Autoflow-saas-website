import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IntegrationType, IntegrationStatus } from '@prisma/client';

export class CreateConnectedAccountDto {
  platform: IntegrationType;
  accountId: string;
  accountName?: string;
  accountHandle?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string | Date;
  metadata?: any;
}

@Injectable()
export class ConnectedAccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByOrg(organizationId: string) {
    return this.prisma.connectedAccount.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
      // Omit tokens from response for security
      select: {
        id: true,
        organizationId: true,
        platform: true,
        accountId: true,
        accountName: true,
        accountHandle: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async connectAccount(
    organizationId: string,
    data: CreateConnectedAccountDto,
  ) {
    // Basic upsert so if they reconnect we just update tokens
    return this.prisma.connectedAccount.upsert({
      where: {
        organizationId_platform_accountId: {
          organizationId,
          platform: data.platform,
          accountId: data.accountId,
        },
      },
      create: {
        organizationId,
        platform: data.platform,
        accountId: data.accountId,
        accountName: data.accountName,
        accountHandle: data.accountHandle,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
        metadata: data.metadata || {},
        status: IntegrationStatus.CONNECTED,
      },
      update: {
        accountName: data.accountName,
        accountHandle: data.accountHandle,
        accessToken: data.accessToken ?? undefined,
        refreshToken: data.refreshToken ?? undefined,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
        metadata: data.metadata ?? undefined,
        status: IntegrationStatus.CONNECTED,
      },
    });
  }

  async disconnectAccount(organizationId: string, accountId: string) {
    // Check if exists
    const account = await this.prisma.connectedAccount.findFirst({
      where: { id: accountId, organizationId },
    });

    if (!account) {
      throw new NotFoundException('Connected account not found');
    }

    return this.prisma.connectedAccount.update({
      where: { id: accountId },
      data: {
        status: IntegrationStatus.DISCONNECTED,
        accessToken: null,
        refreshToken: null,
      },
    });
  }
}
