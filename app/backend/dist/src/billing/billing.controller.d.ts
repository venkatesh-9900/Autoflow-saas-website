import { BillingService } from './billing.service';
export declare class BillingController {
    private readonly billingService;
    constructor(billingService: BillingService);
    getStatus(req: any): Promise<{
        subscriptions: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            status: import("@prisma/client").$Enums.SubscriptionStatus;
            planId: string;
            currentPeriodEnd: Date;
        }[];
        trials: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            serviceName: string;
            expiresAt: Date;
            isConverted: boolean;
        }[];
        isPro: boolean;
    }>;
    startTrial(req: any, serviceName: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        serviceName: string;
        expiresAt: Date;
        isConverted: boolean;
    }>;
    subscribe(req: any, planId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        planId: string;
        currentPeriodEnd: Date;
    }>;
    cancelSubscription(req: any, planId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        planId: string;
        currentPeriodEnd: Date;
    }>;
}
