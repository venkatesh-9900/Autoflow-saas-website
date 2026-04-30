import { PrismaService } from '../prisma/prisma.service';
import { ServiceType, PlanTier } from '@prisma/client';
export declare class PlatformSubscriptionsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getSubscriptions(organizationId: string): Promise<{
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
    getSubscription(organizationId: string, serviceType: ServiceType): Promise<{
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
    subscribe(organizationId: string, serviceType: ServiceType, tier?: PlanTier): Promise<{
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
    unsubscribe(organizationId: string, serviceType: ServiceType): Promise<{
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
    initializeAllSubscriptions(organizationId: string): Promise<{
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
    private getPricing;
    private getFeaturesByTier;
}
