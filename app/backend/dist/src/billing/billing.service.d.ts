import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
export declare class BillingService {
    private prisma;
    private notificationsService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService);
    getBillingStatus(organizationId: string): Promise<{
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
    startTrial(organizationId: string, serviceName: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        serviceName: string;
        expiresAt: Date;
        isConverted: boolean;
    }>;
    subscribe(organizationId: string, planId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        planId: string;
        currentPeriodEnd: Date;
    }>;
    cancelSubscription(organizationId: string, planId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.SubscriptionStatus;
        planId: string;
        currentPeriodEnd: Date;
    }>;
}
