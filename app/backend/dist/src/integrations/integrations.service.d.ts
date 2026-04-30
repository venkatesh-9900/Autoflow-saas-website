import { PrismaService } from '../prisma/prisma.service';
import { IntegrationType } from '@prisma/client';
export declare class IntegrationsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    connectService(organizationId: string, service: IntegrationType, config: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.IntegrationStatus;
        type: import("@prisma/client").$Enums.IntegrationType;
        credentials: import("@prisma/client/runtime/client").JsonValue | null;
        lastError: string | null;
        healthStatus: import("@prisma/client").$Enums.IntegrationStatus | null;
        lastStatusCheck: Date | null;
    }>;
    disconnectService(organizationId: string, service: IntegrationType): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.IntegrationStatus;
        type: import("@prisma/client").$Enums.IntegrationType;
        credentials: import("@prisma/client/runtime/client").JsonValue | null;
        lastError: string | null;
        healthStatus: import("@prisma/client").$Enums.IntegrationStatus | null;
        lastStatusCheck: Date | null;
    } | null>;
    getEnabledIntegrations(organizationId: string): Promise<({
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.IntegrationStatus;
        type: import("@prisma/client").$Enums.IntegrationType;
        credentials: import("@prisma/client/runtime/client").JsonValue | null;
        lastError: string | null;
        healthStatus: import("@prisma/client").$Enums.IntegrationStatus | null;
        lastStatusCheck: Date | null;
    } | {
        type: "WHATSAPP" | "INSTAGRAM" | "FACEBOOK" | "TWITTER" | "EMAIL" | "SMS" | "SHOPIFY" | "WOOCOMMERCE" | "STRIPE" | "RAZORPAY" | "GOOGLE_SHEETS" | "ZAPIER";
        status: "DISCONNECTED";
        credentials: null;
        lastError: null;
    })[]>;
    handleWebhook(service: string, payload: any): Promise<{
        received: boolean;
    }>;
    checkIntegrationHealth(): Promise<void>;
}
