import { AutomationRulesService } from './automation-rules.service';
import { ServiceType, AutomationRuleType } from '@prisma/client';
export declare class AutomationRulesController {
    private readonly rulesService;
    constructor(rulesService: AutomationRulesService);
    getAllRules(req: any): Promise<{
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
    getRulesByPlatform(req: any, platform: ServiceType): Promise<{
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
    toggleRule(req: any, body: {
        platform: ServiceType;
        ruleType: AutomationRuleType;
        enabled: boolean;
    }): Promise<{
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
    updateConfig(req: any, body: {
        platform: ServiceType;
        ruleType: AutomationRuleType;
        config: any;
    }): Promise<{
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
    getEnabledCount(req: any): Promise<{
        count: number;
    }>;
    initializeRules(req: any, platform: ServiceType): Promise<{
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
}
