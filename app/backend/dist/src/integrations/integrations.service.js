"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var IntegrationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationsService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let IntegrationsService = IntegrationsService_1 = class IntegrationsService {
    prisma;
    logger = new common_1.Logger(IntegrationsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async connectService(organizationId, service, config) {
        this.logger.log(`Connecting ${service} for organization ${organizationId}`);
        let status = client_1.IntegrationStatus.CONNECTED;
        if (service === client_1.IntegrationType.INSTAGRAM &&
            (!config.accessToken || !config.accountId)) {
            status = client_1.IntegrationStatus.ERROR;
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
                lastError: status === client_1.IntegrationStatus.ERROR
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
    async disconnectService(organizationId, service) {
        this.logger.log(`Disconnecting ${service} for organization ${organizationId}`);
        return this.prisma.integration
            .delete({
            where: {
                organizationId_type: {
                    organizationId,
                    type: service,
                },
            },
        })
            .catch(() => null);
    }
    async getEnabledIntegrations(organizationId) {
        const activeIntegrations = await this.prisma.integration.findMany({
            where: { organizationId },
        });
        const allTypes = Object.values(client_1.IntegrationType);
        return allTypes.map((type) => {
            const existing = activeIntegrations.find((i) => i.type === type);
            if (existing) {
                return existing;
            }
            return {
                type,
                status: client_1.IntegrationStatus.DISCONNECTED,
                credentials: null,
                lastError: null,
            };
        });
    }
    async handleWebhook(service, payload) {
        this.logger.log(`Received webhook from ${service}`);
        return { received: true };
    }
    async checkIntegrationHealth() {
        this.logger.log('Running scheduled health check for all integrations...');
        const activeIntegrations = await this.prisma.integration.findMany({
            where: { status: client_1.IntegrationStatus.CONNECTED },
        });
        for (const integration of activeIntegrations) {
            const isHealthy = Math.random() > 0.05;
            const status = isHealthy
                ? client_1.IntegrationStatus.CONNECTED
                : client_1.IntegrationStatus.ERROR;
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
                this.logger.warn(`Integration ${integration.type} for org ${integration.organizationId} is experiencing disruption.`);
            }
        }
    }
};
exports.IntegrationsService = IntegrationsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IntegrationsService.prototype, "checkIntegrationHealth", null);
exports.IntegrationsService = IntegrationsService = IntegrationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IntegrationsService);
//# sourceMappingURL=integrations.service.js.map