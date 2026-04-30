import { PlatformSubscriptionsService } from './platform-subscriptions.service';
import { ServiceType, PlanTier } from '@prisma/client';
export declare class PlatformSubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: PlatformSubscriptionsService);
    getAll(req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        active: boolean;
        serviceType: import("@prisma/client").$Enums.ServiceType;
        tier: import("@prisma/client").$Enums.PlanTier;
        priceMonthly: number;
        features: import("@prisma/client/runtime/client").JsonValue | null;
        billingCycleEnd: Date | null;
    }[]>;
    getOne(req: any, serviceType: ServiceType): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        active: boolean;
        serviceType: import("@prisma/client").$Enums.ServiceType;
        tier: import("@prisma/client").$Enums.PlanTier;
        priceMonthly: number;
        features: import("@prisma/client/runtime/client").JsonValue | null;
        billingCycleEnd: Date | null;
    } | null>;
    subscribe(req: any, body: {
        serviceType: ServiceType;
        tier?: PlanTier;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        active: boolean;
        serviceType: import("@prisma/client").$Enums.ServiceType;
        tier: import("@prisma/client").$Enums.PlanTier;
        priceMonthly: number;
        features: import("@prisma/client/runtime/client").JsonValue | null;
        billingCycleEnd: Date | null;
    }>;
    unsubscribe(req: any, body: {
        serviceType: ServiceType;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        active: boolean;
        serviceType: import("@prisma/client").$Enums.ServiceType;
        tier: import("@prisma/client").$Enums.PlanTier;
        priceMonthly: number;
        features: import("@prisma/client/runtime/client").JsonValue | null;
        billingCycleEnd: Date | null;
    }>;
    initializeAll(req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        active: boolean;
        serviceType: import("@prisma/client").$Enums.ServiceType;
        tier: import("@prisma/client").$Enums.PlanTier;
        priceMonthly: number;
        features: import("@prisma/client/runtime/client").JsonValue | null;
        billingCycleEnd: Date | null;
    }[]>;
}
