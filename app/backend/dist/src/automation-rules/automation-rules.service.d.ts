import { PrismaService } from '../prisma/prisma.service';
import { ServiceType, AutomationRuleType } from '@prisma/client';
export declare class AutomationRulesService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getRulesByOrg(organizationId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        stats: import("@prisma/client/runtime/client").JsonValue | null;
        platform: import("@prisma/client").$Enums.ServiceType;
        connectedAccountId: string | null;
        config: import("@prisma/client/runtime/client").JsonValue | null;
        ruleType: import("@prisma/client").$Enums.AutomationRuleType;
        enabled: boolean;
    }[]>;
    getRulesByPlatform(organizationId: string, platform: ServiceType): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        stats: import("@prisma/client/runtime/client").JsonValue | null;
        platform: import("@prisma/client").$Enums.ServiceType;
        connectedAccountId: string | null;
        config: import("@prisma/client/runtime/client").JsonValue | null;
        ruleType: import("@prisma/client").$Enums.AutomationRuleType;
        enabled: boolean;
    }[]>;
    toggleRule(organizationId: string, platform: ServiceType, ruleType: AutomationRuleType, enabled: boolean): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        stats: import("@prisma/client/runtime/client").JsonValue | null;
        platform: import("@prisma/client").$Enums.ServiceType;
        connectedAccountId: string | null;
        config: import("@prisma/client/runtime/client").JsonValue | null;
        ruleType: import("@prisma/client").$Enums.AutomationRuleType;
        enabled: boolean;
    }>;
    updateRuleConfig(organizationId: string, platform: ServiceType, ruleType: AutomationRuleType, config: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        stats: import("@prisma/client/runtime/client").JsonValue | null;
        platform: import("@prisma/client").$Enums.ServiceType;
        connectedAccountId: string | null;
        config: import("@prisma/client/runtime/client").JsonValue | null;
        ruleType: import("@prisma/client").$Enums.AutomationRuleType;
        enabled: boolean;
    }>;
    getEnabledRulesCount(organizationId: string): Promise<number>;
    initializeDefaultRules(organizationId: string, platform: ServiceType): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        stats: import("@prisma/client/runtime/client").JsonValue | null;
        platform: import("@prisma/client").$Enums.ServiceType;
        connectedAccountId: string | null;
        config: import("@prisma/client/runtime/client").JsonValue | null;
        ruleType: import("@prisma/client").$Enums.AutomationRuleType;
        enabled: boolean;
    }[]>;
    private getRuleTypesForPlatform;
    private getDefaultConfig;
}
