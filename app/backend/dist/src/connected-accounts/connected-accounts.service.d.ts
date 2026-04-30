import { PrismaService } from '../prisma/prisma.service';
import { IntegrationType } from '@prisma/client';
export declare class CreateConnectedAccountDto {
    platform: IntegrationType;
    accountId: string;
    accountName?: string;
    accountHandle?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: string | Date;
    metadata?: any;
}
export declare class ConnectedAccountsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAllByOrg(organizationId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.IntegrationStatus;
        platform: import("@prisma/client").$Enums.IntegrationType;
        accountId: string;
        accountName: string | null;
        accountHandle: string | null;
    }[]>;
    connectAccount(organizationId: string, data: CreateConnectedAccountDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.IntegrationStatus;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        expiresAt: Date | null;
        platform: import("@prisma/client").$Enums.IntegrationType;
        accountId: string;
        accountName: string | null;
        accountHandle: string | null;
        accessToken: string | null;
        refreshToken: string | null;
    }>;
    disconnectAccount(organizationId: string, accountId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.IntegrationStatus;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        expiresAt: Date | null;
        platform: import("@prisma/client").$Enums.IntegrationType;
        accountId: string;
        accountName: string | null;
        accountHandle: string | null;
        accessToken: string | null;
        refreshToken: string | null;
    }>;
}
