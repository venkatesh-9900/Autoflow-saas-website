import { ConnectedAccountsService, CreateConnectedAccountDto } from './connected-accounts.service';
export declare class ConnectedAccountsController {
    private readonly connectedAccountsService;
    constructor(connectedAccountsService: ConnectedAccountsService);
    findAll(req: any): Promise<{
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
    connect(req: any, data: CreateConnectedAccountDto): Promise<{
        id: string;
        platform: import("@prisma/client").$Enums.IntegrationType;
        accountId: string;
        accountName: string | null;
        status: import("@prisma/client").$Enums.IntegrationStatus;
    }>;
    disconnect(req: any, id: string): Promise<{
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
