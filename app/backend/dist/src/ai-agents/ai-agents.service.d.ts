import { PrismaService } from '../prisma/prisma.service';
import { ServiceType } from '@prisma/client';
export declare class AIAgentsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getAgentsByOrg(organizationId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.AIAgentStatus;
        platform: import("@prisma/client").$Enums.ServiceType;
        connectedAccountId: string | null;
        config: import("@prisma/client/runtime/client").JsonValue | null;
        analysisResults: import("@prisma/client/runtime/client").JsonValue | null;
        recommendations: import("@prisma/client/runtime/client").JsonValue | null;
        lastAnalyzedAt: Date | null;
    }[]>;
    getAgentByPlatform(organizationId: string, platform: ServiceType): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.AIAgentStatus;
        platform: import("@prisma/client").$Enums.ServiceType;
        connectedAccountId: string | null;
        config: import("@prisma/client/runtime/client").JsonValue | null;
        analysisResults: import("@prisma/client/runtime/client").JsonValue | null;
        recommendations: import("@prisma/client/runtime/client").JsonValue | null;
        lastAnalyzedAt: Date | null;
    } | null>;
    createOrUpdateAgent(organizationId: string, data: {
        platform: ServiceType;
        connectedAccountId?: string;
        config?: any;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.AIAgentStatus;
        platform: import("@prisma/client").$Enums.ServiceType;
        connectedAccountId: string | null;
        config: import("@prisma/client/runtime/client").JsonValue | null;
        analysisResults: import("@prisma/client/runtime/client").JsonValue | null;
        recommendations: import("@prisma/client/runtime/client").JsonValue | null;
        lastAnalyzedAt: Date | null;
    }>;
    activateAgent(organizationId: string, platform: ServiceType): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.AIAgentStatus;
        platform: import("@prisma/client").$Enums.ServiceType;
        connectedAccountId: string | null;
        config: import("@prisma/client/runtime/client").JsonValue | null;
        analysisResults: import("@prisma/client/runtime/client").JsonValue | null;
        recommendations: import("@prisma/client/runtime/client").JsonValue | null;
        lastAnalyzedAt: Date | null;
    }>;
    pauseAgent(organizationId: string, platform: ServiceType): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.AIAgentStatus;
        platform: import("@prisma/client").$Enums.ServiceType;
        connectedAccountId: string | null;
        config: import("@prisma/client/runtime/client").JsonValue | null;
        analysisResults: import("@prisma/client/runtime/client").JsonValue | null;
        recommendations: import("@prisma/client/runtime/client").JsonValue | null;
        lastAnalyzedAt: Date | null;
    }>;
    analyzeAccount(organizationId: string, platform: ServiceType): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        status: import("@prisma/client").$Enums.AIAgentStatus;
        platform: import("@prisma/client").$Enums.ServiceType;
        connectedAccountId: string | null;
        config: import("@prisma/client/runtime/client").JsonValue | null;
        analysisResults: import("@prisma/client/runtime/client").JsonValue | null;
        recommendations: import("@prisma/client/runtime/client").JsonValue | null;
        lastAnalyzedAt: Date | null;
    }>;
    detectIntent(message: string, platform: ServiceType): Promise<any>;
    generateReply(intent: string, platform: ServiceType, context?: any): Promise<string>;
    private getDefaultConfig;
    private generateAnalysis;
    private generateRecommendations;
}
