import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { IntegrationType, IntegrationStatus } from '@prisma/client';

@Injectable()
export class IntegrationsService {
  private readonly logger = new Logger(IntegrationsService.name);

  constructor(private prisma: PrismaService) {}

  async connectService(
    organizationId: string,
    service: IntegrationType,
    config: any,
  ) {
    this.logger.log(`Connecting ${service} for organization ${organizationId}`);

    let status: IntegrationStatus = IntegrationStatus.CONNECTED;
    // Basic validation mock for Instagram
    if (
      service === IntegrationType.INSTAGRAM &&
      (!config.accessToken || !config.accountId)
    ) {
      status = IntegrationStatus.ERROR;
    }

    return this.prisma.integration.upsert({
      where: {
        organizationId_type: {
          organizationId,
          type: service,
        },
      },
      update: {
        credentials: config,
        status,
        lastError:
          status === IntegrationStatus.ERROR
            ? 'Missing required credentials'
            : null,
      },
      create: {
        organizationId,
        type: service,
        credentials: config,
        status,
      },
    });
  }

  async disconnectService(organizationId: string, service: IntegrationType) {
    this.logger.log(
      `Disconnecting ${service} for organization ${organizationId}`,
    );
    return this.prisma.integration
      .delete({
        where: {
          organizationId_type: {
            organizationId,
            type: service,
          },
        },
      })
      .catch(() => null); // Ignore if not found
  }

  async getEnabledIntegrations(organizationId: string) {
    const activeIntegrations = await this.prisma.integration.findMany({
      where: { organizationId },
    });

    // Map over all Enum types to return a full platform status
    const allTypes = Object.values(IntegrationType);

    return allTypes.map((type) => {
      const existing = activeIntegrations.find((i) => i.type === type);
      if (existing) {
        return existing;
      }
      return {
        type,
        status: IntegrationStatus.DISCONNECTED,
        credentials: null,
        lastError: null,
      };
    });
  }

  async handleWebhook(service: string, payload: any) {
    this.logger.log(`Received webhook from ${service}`);
    return { received: true };
  }

  @Cron(CronExpression.EVERY_HOUR)
  async checkIntegrationHealth() {
    this.logger.log('Running scheduled health check for all integrations...');
    const activeIntegrations = await this.prisma.integration.findMany({
      where: { status: IntegrationStatus.CONNECTED },
    });

    for (const integration of activeIntegrations) {
      // Mock pinging external Meta/SMTP/WhatsApp APIs
      const isHealthy = Math.random() > 0.05; // 95% chance healthy

      const status = isHealthy
        ? IntegrationStatus.CONNECTED
        : IntegrationStatus.ERROR;
      const lastError = isHealthy
        ? null
        : 'Failed to reach external API endpoint.';

      await this.prisma.integration.update({
        where: { id: integration.id },
        data: {
          lastStatusCheck: new Date(),
          healthStatus: status,
          lastError,
        },
      });

      if (!isHealthy) {
        this.logger.warn(
          `Integration ${integration.type} for org ${integration.organizationId} is experiencing disruption.`,
        );
      }
    }
  }
}
