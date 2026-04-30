import { IntegrationsService } from './integrations.service';
import { IntegrationType } from '@prisma/client';
export declare class IntegrationsController {
    private readonly integrationsService;
    constructor(integrationsService: IntegrationsService);
    getIntegrations(req: any): Promise<({
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
    connectService(service: IntegrationType, config: any, req: any): Promise<{
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
    disconnectService(service: IntegrationType, req: any): Promise<{
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
    handleWebhook(service: string, payload: any): Promise<{
        received: boolean;
    }>;
}
