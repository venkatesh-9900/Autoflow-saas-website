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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectedAccountsService = exports.CreateConnectedAccountDto = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
class CreateConnectedAccountDto {
    platform;
    accountId;
    accountName;
    accountHandle;
    accessToken;
    refreshToken;
    expiresAt;
    metadata;
}
exports.CreateConnectedAccountDto = CreateConnectedAccountDto;
let ConnectedAccountsService = class ConnectedAccountsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllByOrg(organizationId) {
        return this.prisma.connectedAccount.findMany({
            where: { organizationId },
            orderBy: { createdAt: 'desc' },
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
    async connectAccount(organizationId, data) {
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
                status: client_1.IntegrationStatus.CONNECTED,
            },
            update: {
                accountName: data.accountName,
                accountHandle: data.accountHandle,
                accessToken: data.accessToken ?? undefined,
                refreshToken: data.refreshToken ?? undefined,
                expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined,
                metadata: data.metadata ?? undefined,
                status: client_1.IntegrationStatus.CONNECTED,
            },
        });
    }
    async disconnectAccount(organizationId, accountId) {
        const account = await this.prisma.connectedAccount.findFirst({
            where: { id: accountId, organizationId },
        });
        if (!account) {
            throw new common_1.NotFoundException('Connected account not found');
        }
        return this.prisma.connectedAccount.update({
            where: { id: accountId },
            data: {
                status: client_1.IntegrationStatus.DISCONNECTED,
                accessToken: null,
                refreshToken: null,
            },
        });
    }
};
exports.ConnectedAccountsService = ConnectedAccountsService;
exports.ConnectedAccountsService = ConnectedAccountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConnectedAccountsService);
//# sourceMappingURL=connected-accounts.service.js.map